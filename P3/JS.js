const _ANCHO = 360;
const _ALTO = 240;

var _ncols;
var _nrows;
var _aciertos=0;
var bueno=[];
var malo=[];
var ord = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
var ord2 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53];
var ord3 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95];



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
	var _difi =document.querySelector("#diff");

	if(_difi.value == 0){

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

		ord = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
		bueno=trozos;	
		malo=trozos;
		desordenar(malo,ord); // vector desordenado
		cont=0;
		fil=0;
		col=0;
		for(f=0;f<_nrows;f++){
				for(c=0;c<_ncols;c++){
					ctx02.putImageData(malo[cont],fil,col);
					fil+=60;
					cont++;
				}
				col+=60;
				c=0;
				fil=0;
			}

	}else if (_difi.value==1) {
		var f,c,trozos=[],cont=0,fil=0,col=0; // trozos en un array ordenado con todos los fragmentos del canvas 1
			for(f=0;f<_nrows;f++){
				for(c=0;c<_ncols;c++){
					trozos[cont]=ctx01.getImageData(fil,col,cv01.width/_ncols,cv01.height/_nrows);
					fil+=40;
					cont++;
				}
				col+=40;
				c=0;
				fil=0;
			}

		ord2 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54];

		bueno=trozos;	
		malo=trozos;
		desordenar(malo,ord2); // vector desordenado
		cont=0;
		fil=0;
		col=0;
		for(f=0;f<_nrows;f++){
				for(c=0;c<_ncols;c++){
					ctx02.putImageData(malo[cont],fil,col);
					fil+=40;
					cont++;
				}
				col+=40;
				c=0;
				fil=0;
			}
	}else if(_difi.value==2){

		var f,c,trozos=[],cont=0,fil=0,col=0; // trozos en un array ordenado con todos los fragmentos del canvas 1
			for(f=0;f<_nrows;f++){
				for(c=0;c<_ncols;c++){
					trozos[cont]=ctx01.getImageData(fil,col,cv01.width/_ncols,cv01.height/_nrows);
					fil+=30;
					cont++;
				}
				col+=30;
				c=0;
				fil=0;
			}

		ord3 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95];


		bueno=trozos;	
		malo=trozos;
		desordenar(malo,ord3); // vector desordenado
		cont=0;
		fil=0;
		col=0;
		for(f=0;f<_nrows;f++){
				for(c=0;c<_ncols;c++){
					ctx02.putImageData(malo[cont],fil,col);
					fil+=30;
					cont++;
				}
				col+=30;
				c=0;
				fil=0;
			}
	}
	
	
	dibujarLineas();	
	
	jugar();
	console.log('Orden: '+ord)

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


function desordenar(lista,orden){
var _difi =document.querySelector("#diff");
	if(_difi.value==0){

		lista=bueno;
		orden = ord;

		var j, x, i, y;
	   	for (i = 24 - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	       
	        x = lista[i];
	        lista[i] = lista[j];
	        lista[j] = x;
	    
	        y = orden[i];
	        orden[i] = orden[j];
	        orden[j] = y;
	    }
	  
	  	malo=lista;
	  	ord = orden;
	  }else if (_difi.value==1){

	  	lista=bueno;
		orden = ord2;

		var j, x, i, y;
	   	for (i = 54 - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	       
	        x = lista[i];
	        lista[i] = lista[j];
	        lista[j] = x;
	    
	        y = orden[i];
	        orden[i] = orden[j];
	        orden[j] = y;
	    }
	  
	  	malo=lista;
	  	ord2 = orden;
	  }else{

	  	lista=bueno;
		orden = ord3;

		var j, x, i, y;
	   	for (i = 96 - 1; i > 0; i--) {
	        j = Math.floor(Math.random() * (i + 1));
	       
	        x = lista[i];
	        lista[i] = lista[j];
	        lista[j] = x;
	    
	        y = orden[i];
	        orden[i] = orden[j];
	        orden[j] = y;
	    }
	  
	  	malo=lista;
	  	ord3 = orden;

	  }
	
}


function jugar(){

	var cv02 = getCV('#cDos'),
		cv01 = getCV('#cUno'),
		ctx01= getCTX('#cUno'),
		ctx02= getCTX('#cDos');
	var _difi =document.querySelector("#diff");
	var click=-1,
		res;

	cv02.onclick = function(e){

		console.log('Entro a jugar')
		let x = e.offsetX,
			y = e.offsetY,
			pos = getPosicion(x,y),
			[col,fil]=sacarFilaColumna(e),
			colA=1,
			filA=1;
			console.log(fil+'/' +col)
			console.log('pos'+pos)
		var extra,extra2;
			
			if(click==-1){
				click=pos;
				colA=col;
				filA=fil;
				console.log('Primer click con posicion: '+click)
			}else{
				res = corrige(pos,click);
				if(res==1){
					console.log('Acierto')
					if(_difi.value==0){
					extra=malo[pos];
						extra2=ord[pos];
					malo[pos]=malo[click];
						ord[pos]=ord[click];
					malo[click]=extra;
						ord[click]=extra2;
					}
					if(_difi.value==1){
					extra=malo[pos];
						extra2=ord2[pos];
					malo[pos]=malo[click];
						ord2[pos]=ord2[click];
					malo[click]=extra;
						ord2[click]=extra2;
					}
					if(_difi.value==2){
					extra=malo[pos];
						extra2=ord3[pos];
					malo[pos]=malo[click];
						ord3[pos]=ord3[click];
					malo[click]=extra;
						ord3[click]=extra2;
					}
					
					dibujarOK();
					contarAciertos();
					console.log('Aciertos: '+_aciertos);


					
				}
				click=-1;

			}
			



	}
}

function getPosicion(x,y){
var _difi =document.querySelector("#diff");




if(_difi.value==0){
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
			return 18;
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
	if(_difi.value==1){
		var xx=0,xxx=40,yy=0,yyy=40,pos=0;
		for(let i=0;i<6;i++){

			for(let u=0;u<9;u++){
				if(x>xx && x<=xxx && y>yy && y<=yyy){
				
					return pos;
				}
				pos++;
				xx+=40;
				xxx+=40;
			}
			xx=0;
			xxx=40;
			yy+=40;
			yyy+=40;

		}

	}

	if(_difi.value==2){
		var xx=0,xxx=30,yy=0,yyy=30,pos=0;
		for(let i=0;i<8;i++){

			for(let u=0;u<12;u++){
				if(x>xx && x<=xxx && y>yy && y<=yyy){
				
					return pos;
				}
				pos++;
				xx+=30;
				xxx+=30;
			}
			xx=0;
			xxx=30;
			yy+=30;
			yyy+=30;

		}

	}

}

function corrige(pos,click){
	var _difi =document.querySelector("#diff");
	if(_difi.value==0){
		if(pos==ord[click]){
			return 1;
		}else {
			return 0;
		}
	}

	if(_difi.value==1){
		if(pos==ord2[click]){
			return 1;
		}else {
			return 0;
		}
	}
	if(_difi.value==2){
		if(pos==ord3[click]){
			return 1;
		}else {
			return 0;
		}
	}


	
}

function dibujarOK(){
	let ctx02 = getCTX('#cDos');
	cont=0;
	fil=0;
	col=0;
	var _difi =document.querySelector("#diff");
	if(_difi.value==0){
		for(f=0;f<_nrows;f++){
				for(c=0;c<_ncols;c++){
					ctx02.putImageData(malo[cont],fil,col);
					fil+=60;
					cont++;
				}
				col+=60;
				c=0;
				fil=0;
			}
	}
	if(_difi.value==1){
		for(f=0;f<_nrows;f++){
				for(c=0;c<_ncols;c++){
					ctx02.putImageData(malo[cont],fil,col);
					fil+=40;
					cont++;
				}
				col+=40;
				c=0;
				fil=0;
			}
	}
	if(_difi.value==2){
		for(f=0;f<_nrows;f++){
				for(c=0;c<_ncols;c++){
					ctx02.putImageData(malo[cont],fil,col);
					fil+=30;
					cont++;
				}
				col+=30;
				c=0;
				fil=0;
			}
	}




		dibujarLineas();
}


function contarAciertos(){


	_aciertos=0;
	var _difi =document.querySelector("#diff");
	if(_difi.value==0){
		for(var i=0;i<ord.length;i++){

			if(ord[i]===i){
				_aciertos++;
			}
		}
	}

	if(_difi.value==1){
		for(var i=0;i<ord2.length;i++){

			if(ord2[i]===i){
				_aciertos++;
			}
		}
	}


	if(_difi.value==2){
		for(var i=0;i<ord3.length;i++){

			if(ord3[i]===i){
				_aciertos++;
			}
		}
	}

}


function ayuda(){
	var cv02 = getCV('#cDos')
	var ctx = getCTX('#cDos');
	var un = 0,dos=0;
	var _difi =document.querySelector("#diff");	

	ctx.fillStyle = 'rgba(0,0,200,.6)'; // para hacerlo con trasnparencias

	if(_difi.value==0){

		for(let i=0;i<ord.length;i++){
			if(ord[i]!=i){
				ctx.fillRect(un,dos,60,60);
			}
			un+=60;
			if(un>=360){
				un=0;
				dos+=60;
			}
		}

	}

	if(_difi.value==1){

		for(let i=0;i<ord2.length;i++){
			if(ord2[i]!=i){
				ctx.fillRect(un,dos,40,40);
			}
			un+=40;
			if(un>=360){
				un=0;
				dos+=40;
			}
		}

	}

	if(_difi.value==2){

		for(let i=0;i<ord3.length;i++){
			if(ord3[i]!=i){
				ctx.fillRect(un,dos,30,30);
			}
			un+=30;
			if(un>=360){
				un=0;
				dos+=30;
			}
		}

	}


	
}