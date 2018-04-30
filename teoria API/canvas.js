var ancho = 480;
var alto = 360;

function pintarRectangulo(){

	let cv = document.querySelector('#cv01'),
	ctx = cv.getContext('2d');


	ctx.strokeStyle = '#a00';  // color linea
	ctx.lineWidth = 10;       //ancho de linea
	ctx.fillStyle = '#8DC745'; //color de relleno

	ctx.strokeRect(40,50,100,75); //posicion + medidas

	ctx.fillRect(150,20,80,60);
	ctx.strokeRect(150,20,80,60);

	ctx.fillStyle = 'rgba(0,0,200,.6)'; // para hacerlo con trasnparencias
	ctx.fillRect(200,50,100,60);
}


function prepararCanvas(){



		let cv = document.querySelector('#cv01'),
			ctx = cv.getContext('2d');

		cv.width = ancho;
		cv.height = alto;

		ctx.fillStyle = document.querySelector('#colorRelleno').value;
		ctx.strokeStyle = document.querySelector('#colorBorde').value;



}

function pintarRect(){


	let cv = document.querySelector('#cv01'),
	ctx = cv.getContext('2d');

	
	ctx.lineWidth = 2;
	

	ctx.strokeRect(40,50,100,75);

}

function rellenarRect(){

	let cv = document.querySelector('#cv01'),
	ctx = cv.getContext('2d');

}

function rellenarSombra(){

	let cv = document.querySelector('#cv01'),
	ctx = cv.getContext('2d');

	
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
	ctx.shadowBlur = 10;
	ctx.shadowColor = '#362525';

	ctx.fillRect(200,100,100,50);
}


function limpiar(){

	let cv = document.querySelector('#cv01'),
	ctx = cv.getContext('2d');

	//ctx.clearRect(100,100,150,100);	
	cv.width = cv.width;

}

function dibujarTexto(){

	let cv = document.querySelector('#cv01'),
	ctx = cv.getContext('2d');

	ctx.font = 'bold 20px Arial';
	ctx.textAlign = 'center'; 
	ctx.shadowOffsetX = 5;
	ctx.shadowOffsetY = 5;
	ctx.shadowBlur = 10;
	ctx.shadowColor = '#B4EC1A';


	ctx.fillText('Cine de Barrio la señora murió (Feka newz)',ancho/2,alto/2);
	ctx.lineWidth = 2;
	ctx.strokeText('Cine de Barrio la señora murió (Feka newz)',ancho/2,alto/2);

}

function cambiarColorBorde(){


	let cv = document.querySelector('#cv01'),
	ctx = cv.getContext('2d');

	ctx.strokeStyle = document.querySelector('#colorBorde').value;


}

function cambiarColorRelleno(){


	let cv = document.querySelector('#cv01'),
	ctx = cv.getContext('2d');

	ctx.fillStyle = document.querySelector('#colorRelleno').value;


}