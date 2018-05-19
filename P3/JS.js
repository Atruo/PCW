const _ANCHO = 360;
const _ALTO = 240;

var _ncols;
var _nrows;
var _aciertos;


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
		imgData = ctx01.getImageData(0,0,cv01.width/_ncols,cv01.height/_nrows);
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

	console.log(trozos)

	var desorden=desordenar(trozos); // vector desordenado
	cont=0;
	fil=0;
	col=0;
	for(f=0;f<_nrows;f++){
			for(c=0;c<_ncols;c++){
				ctx02.putImageData(desorden[cont],fil,col);
				fil+=60;
				cont++;
			}
			col+=60;
			c=0;
			fil=0;
		}

	
	
	
	dibujarLineas();
	jugar();

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


	var lista2=[];
	lista2[0]=lista[3];
	lista2[1]=lista[22];
	lista2[2]=lista[5];
	lista2[3]=lista[18];
	lista2[4]=lista[1];
	lista2[5]=lista[20];
	lista2[6]=lista[0];
	lista2[7]=lista[19];
	lista2[8]=lista[2];
	lista2[9]=lista[21];
	lista2[10]=lista[4];
	lista2[11]=lista[23];
	lista2[12]=lista[15];
	lista2[13]=lista[8];
	lista2[14]=lista[12];
	lista2[15]=lista[11];
	lista2[16]=lista[17];
	lista2[17]=lista[6];
	lista2[18]=lista[9];
	lista2[19]=lista[14];
	lista2[20]=lista[7];
	lista2[21]=lista[16];
	lista2[22]=lista[10];
	lista2[23]=lista[13];

	console.log(lista2)
	return lista2;

}


function jugar(){

	let cv02 = getCV('#cDos'),
		cv01 = getCV('#cUno'),
		ctx01= getCTX('#cUno'),
		ctx02= getCTX('#cDos');
	var click=-1,res;
	cv02.onclick = function(e){

		let x = e.offsetX,
			y = e.offsetY,
			pos = getPosicion(x,y);

			
			if(click=-1){
				click=pos;
			}else{
				res = corrige(clik,pos);
				if(res==1){
					_aciertos++;
					
				}
			}
			



	}
}

function getPosicion(x,y){

	if(y>=0&&y<=60){
		if(x>=0 && x<=60){
			return 0;
		}else if (x>60 && x<=120){
			return 1;
		}else if (x>120 && x<=180){
			return 2;
		}else if (x>180 && x<=240){
			return 3;			
		}else if (x>240 && x<=300){
			return 4;			
		}else if (x>300 && x<=360){
			return 5;
		}
	}else if (y>60 && y<=120){

		if(x>=0 && x<=60){
			return 6;
		}else if (x>60 && x<=120){
			return 7;
		}else if (x>120 && x<=180){
			return 8;
		}else if (x>180 && x<=240){
			return 9;			
		}else if (x>240 && x<=300){
			return 10;			
		}else if (x>300 && x<=360){
			return 11;
		}
	}else if (y>120 && y<=180){
		if(x>=0 && x<=60){
			return 12;
		}else if (x>60 && x<=120){
			return 13;
		}else if (x>120 && x<=180){
			return 14;
		}else if (x>180 && x<=240){
			return 15;			
		}else if (x>240 && x<=300){
			return 16;			
		}else if (x>300 && x<=360){
			return 17;
		}
		
	}else if (y>180 && y<=240){

		if(x>=0 && x<=60){
			return 17;
		}else if (x>60 && x<=120){
			return 19;
		}else if (x>120 && x<=180){
			return 20;
		}else if (x>180 && x<=240){
			return 21;			
		}else if (x>240 && x<=300){
			return 22;			
		}else if (x>300 && x<=360){
			return 23;
		}
	}

}

function corrige(x,y){

	if(x==0 && y==3){
		return 1;
	}else if(x==1 && y==22){
		return 1;
	}else if(x==2 && y==5){
		return 1;
	}else if(x==3 && y==18){
		return 1;
	}else if(x==4 && y==1){
		return 1;
	}else if(x==5 && y==20){
		return 1;
	}else if(x==6 && y==0){
		return 1;
	}else if(x==7 && y==19){
		return 1;
	}else if(x==8 && y==2){
		return 1;
	}else if(x==9 && y==21){
		return 1;
	}else if(x==10 && y==4){
		return 1;
	}else if(x==11 && y==23){
		return 1;
	}else if(x==12 && y==15){
		return 1;
	}else if(x==13 && y==8){
		return 1;
	}else if(x==14 && y==12){
		return 1;
	}else if(x==15 && y==11){
		return 1;
	}else if(x==16 && y==17){
		return 1;
	}else if(x==17 && y==6){
		return 1;
	}else if(x==18 && y==9){
		return 1;
	}else if(x==19 && y==14){
		return 1;
	}else if(x==20 && y==7){
		return 1;
	}else if(x==21 && y==16){
		return 1;
	}else if(x==22 && y==10){
		return 1;
	}else if(x==23 && y==13){
		return 1;
	}else {
		return 0;
	}
}