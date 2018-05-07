var ANCHO = 360;
var ALTO = 360;
function prepararCanvas(){

	let cvs = document.querySelectorAll('canvas');

	cvs.forEach(function(e){
		e.width = ANCHO;
		e.height = ALTO;

	});

	//drag and drop

	let cv01=document.querySelector('#cv01');
	cv01.ondragover = function(e){

		e.stopPropagation();
		e.preventDefault(); //return false
	};
	cv01.ondrop = function(e){

		e.stopPropagation();
		e.preventDefault(); //return false

		let fichero = e.dataTransfer.files[0],
			fr = new FileReader();

		fr.onload = function(){
			let img = new Image();
			img.onload = function(){
				let ctx = cv01.getContext('2d');
				ctx.drawImage(img,0,0,cv.width,cv.height);
			};
			img.src = fr.result;
			
		}
		fr.readAsDataURL(fichero);

	}
}


function prueba01(){

	let cv = document.querySelector('#cv01'),
		ctx = cv.getContext('2d');

		ctx.strokeStyle = '#a00';
		ctx.lineWidth = 2;
		ctx.strokeRect(0,0,100,75);
}

function mover(){

	let cv = document.querySelector('#cv01'),
		ctx = cv.getContext('2d');

		ctx.translate(75,50);
}

function escalar(){

	let cv = document.querySelector('#cv01'),
		ctx = cv.getContext('2d');

		ctx.scale(1,2);
}

function rotar(){

	let cv = document.querySelector('#cv01'),
		ctx = cv.getContext('2d'),
		ang = 45;

		ctx.rotate(Math.PI*(ang/180));
}

function limpiar(){

	let cv = document.querySelector('#cv01');

	cv.width = cv.width;
}


function pintarImagen(){

	let cv = document.querySelector('#cv01'),
		ctx = cv.getContext('2d'),
		img = new Image();
		img.onload = function(){
			ctx.drawImage(img,0,0,cv.width/2,cv.height/2);
		};
		img.src = 'logo1.jpg';

		
}

function pintarImagen2(){

	let cv = document.querySelector('#cv01'),
		ctx = cv.getContext('2d'),
		img = new Image();
		img.onload = function(){
			ctx.drawImage(img,20,20,cv.width,cv.height,0,0,cv.width,cv.height);
		};
		img.src = 'logo1.jpg';

		
}

function copiarCanvas(){

	let cv = document.querySelector('#cv01'),
		ctx = cv.getContext('2d'),
		cv2 = document.querySelector('#cv02'),
		ctx2 = cv2.getContext('2d'),
		imgData;

		imgData = ctx.getImageData(0,0,cv.width,cv.height);
		ctx2.putImageData(imgData,0,0);
}

function dibujarLineas(){
	let cv = document.querySelector('#cv02'),
		ctx = cv.getContext('2d'),
		ncols = 3,
		dim = cv.width/ncols;

		ctx.beginPath();
		ctx.strokeStyle='#a00';
		ctx.lineWidth = 2;

		for(let i=1;i<ncols;i++){

			//lineas horizontales
			ctx.moveTo(0,i*dim);
			ctx.lineTo(cv.width,i*dim);

			//lineas verticales
			ctx.moveTo(i*dim,0);
			ctx.lineTo(i*dim,cv.height);
		}
		ctx.rect(0,0,cv.width,cv.height);
		ctx.stroke();
}