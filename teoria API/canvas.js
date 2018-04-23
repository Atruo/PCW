function pintarRectangulo(){

	let cv = document.querySelector('body>section:first-of-type>canvas'),
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



		let cv = document.querySelector('body>section:first-of-type>canvas');
		cv.width = '480';
		cv.height = '360'
}