const _ANCHO = 360;
const _ALTO = 240;

var ncols;
var nrows;

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
	}
	else if(diff.value == 1){
		ncols = 6;
		nrows = 9;	
	}
	else if(diff.value == 2){
		ncols = 8;
		nrows = 12;
	}
	else{
		ncols = 4;
		nrows = 3;
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

