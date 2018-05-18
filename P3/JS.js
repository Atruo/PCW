const _ANCHO = 360;
const _ALTO = 240;

var _ncols;
var _nrows;

function getCTX(query){
	let cv = document.querySelector(query);

	return cv.getContext('2d');
}

function getCV(query){
	return document.querySelector(query);
}

function prepararCanvas(){
	let cvs = document.querySelectorAll("canvas");
	
	cvs.forEach(function(e){
		e.width 	= _ANCHO;
		e.height 	= _ALTO;
	});

	//derrapa&dropea
	let c1 = document.querySelector('#cUno');
	c1.ondragover = function(e){
		e.stopPropagation();
		e.preventDefault(); //return false;
		console.log("DERRAPANDO");
	};

	c1.ondrop = function(e){
		e.stopPropagation();
		e.preventDefault(); //return false;	

		let fichero = e.dataTransfer.files[0];
		let fr = new FileReader();

		fr.onload = function(){
			let img = new Image();
			img.onload = function(){
				let ctx = c1.getContext('2d');
				ctx.drawImage(img,0,0,c1.width,c1.height);
				
				copiarCanvas();	//CARGA DE FORMA ASÍNCRONA ÓPTIMA :ok_hand:
			};
			img.src = fr.result;
		};
		fr.readAsDataURL(fichero);
	};
}

function copiarCanvas(){
	let query = '#cUno';
		let cv1 = getCV(query);
		let ctx1 = getCTX(query);

	query = '#cDos';
		let cv2 = getCV(query);
		let ctx2 = getCTX(query);


	let imgData = ctx1.getImageData(0,0,cv1.width,cv1.height);

	ctx2.putImageData(imgData,0,0);

	//CREO LAS LINEAS
	dibujarLineas();
}

function dibujarLineas(){
	let query = '#cDos';
	let cv = getCV(query);
	let ctx = getCTX(query);

	let diff = document.querySelector("#diff");
	if(diff.value == 0){
		ncols = 4;
		nrows = 6;
		_ncols=6;
		_nrows=4;
	}
	else if(diff.value == 1){
		ncols = 6;
		nrows = 9;	
		_ncols=9;
		_nrows=6;
	}
	else if(diff.value == 2){
		ncols = 8;
		nrows = 12;
		_ncols=12;
		_nrows=8;
	}
	else{
		ncols = 4;
		nrows = 3;
		_ncols=3;
		_nrows=4;
	}

	let dimy = cv.width/nrows;
	let dimx = cv.height/ncols;

	ctx.beginPath();
	ctx.strokeStyle = document.querySelector("#color").value;
	ctx.lineWidth = 5;

	for(let i=0 ; i<ncols ; i++){
		ctx.moveTo(0, i*dimx);
		ctx.lineTo(cv.width, i*dimx);

	}
	
	for(let i=0 ; i<nrows ; i++){
		ctx.moveTo(i*dimy, 0);
		ctx.lineTo(i*dimy, cv.height);
	}

	ctx.rect(0,0,cv.width,cv.height);
	ctx.stroke();
}

function cargaImg(input){
	let query = '#cUno';
		let cv = getCV(query);
		let ctx = getCTX(query);

	let img = new Image();

	img.onload = function(){
		//PROBAR CON LOCALHOST
		ctx.drawImage(img,0,0,cv.width,cv.height);
		copiarCanvas();
	};
	img.src = URL.createObjectURL(input.files[0]);

	//console.log(input.files[0]);
}

function mezclarImg(){
	let cv02=document.getElementById('cDos'),
		cv01=document.getElementById('cUno'),
		ctx01=cv01.getContext('2d'),
		ctx02=cv02.getContext('2d'),
		imgData;

	/*cv02.onmousemove = function(e){
	let x = e.offsetX,
		y = e.offsetY,
		dim=(e.target.width/_ncols),
		tam=60,
		[col,fila] = sacarFilaColumna(e);
		console.log(x);
 		
		cv02.width = cv02.width;
		let ctx02 = cv02.getContext('2d');
		//ctx02.drawImage(cv01,col*dim,fila*dim,tam,tam,col*dim,fila*dim,tam,tam);
		let x = 
		dibujarLineas();
	}*/
	var f,c,trozos=[],cont=0,fil=0,col=0; // trozos en un array ordenado con todos los fragmentos del canvas 1
		for(f=0;f<_nrows;f++){
			for(c=0;c<_ncols;c++){
				trozos[cont]=ctx01.getImageData(fil,col,cv01.width/_ncols,cv01.height/_nrows);
				fil+=60;
				cont++;
			}
			col+=60;
			c=0;
			fil=0;
		}

	//imgData = ctx01.getImageData(0,0,cv01.width/_ncols,cv01.height/_nrows);
	var desorden=desordenar(trozos);
	cont=0;
	fil=0;
	col=0;
	for(f=0;f<_nrows;f++){
			for(c=0;c<_ncols;c++){
				ctx02.putImageData(trozos[cont],fil,col);
				fil+=60;
				cont++;
			}
			col+=60;
			c=0;
			fil=0;
		}

	
	
	
	dibujarLineas();

}

function sacarFilaColumna(e){

	let x = e.offsetX-7,
		y = e.offsetY-7,
		dim = e.target.width/_ncols,
		fila,col;

		col= Math.floor(x/dim);
		fila= Math.floor(y/dim);
		
		return [col,fila];


}

function desordenar(lista){


	lista = lista.sort(function() {return Math.random() - 0.5});
	return lista;
}