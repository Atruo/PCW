var recetas;
var recetasCreadas = 0;  // numero de receras creadas hasta la fecha
var numPagActual = 1;    //Numero de la pagina actual


function hacerLogin(frm){

	let xhr = new XMLHttpRequest(),
		url = './rest/login/',
		fd  = new FormData(frm);

	xhr.open('POST',url,true);
	xhr.onload = function(){
		console.log(xhr.responseText);
		let r = JSON.parse(xhr.responseText);

		var error = document.getElementById('login_mal'),
		ocultar = document.getElementById('logeo');

		

		if(r.RESULTADO=='OK'){
			sessionStorage.setItem('usuario',xhr.responseText);
			console.log("Sesion Iniciada");
			location.href = "index.html";


		}else{
			console.log("Error en el login");

			//alert("Error al hacer login");
			//location.reload();

			

				ocultar.style.display = 'none';
				error.style.display = 'block';

		}
	};
	xhr.send(fd);

	return false;

}
function quitarMensaje(){

	var error = document.getElementById('login_mal'),
		ocultar = document.getElementById('logeo');

		ocultar.style.display = 'block';
		error.style.display = 'none';


}
function comprobarStorage(){

	var login = sessionStorage.getItem('usuario');
	

	if(login){
		console.log('SE QUE ESTOY LOGEADO');
		
		document.getElementById('menu_login').innerHTML="";
		document.getElementById('menu_registro').innerHTML="";
		
		var log = window.location.href.split('/log');     //Para restringir el acceso a login estando logeado
		var reg = window.location.href.split('/regi');	  //Para restringir el acceso a registro estando logeado

		if(log[1] == "in.html"){
			location.href = "index.html";
		}

		if(reg[1] == "stro.html"){
			location.href = "index.html";
		}		 




	}else{
		console.log('NO ESTOY LOGEADO');
		document.getElementById('menu_nueva').innerHTML="";
		document.getElementById('menu_logout').innerHTML="";
	}

	var inde = window.location.href.split('/ind');

	if(inde[1] == "ex.html"){
		pedirEntradas();
	}

}

function cerrarSesion(){
	sessionStorage.clear();
}


function busquedaRapida(){

	//console.log('Entro en buscar');
	let text = document.getElementById('textBR');

	
	location.href = "buscar.html?"+text.value;
	pedirRecetasB(text.value);
	
	
	

}



//Pedir recetas para buscar
function pedirRecetasB(para){

	
	let xhr = new XMLHttpRequest(),
		url = 'rest/receta/?t='+para;
	var totalRecetas = 0;
		
	xhr.open('GET',url, true);
	xhr.onload = function(){
		var recetasB = JSON.parse(xhr.responseText);			
		

			ponerRecetasB(recetasB);	

		};

		xhr.send();
}

function ponerRecetasB(recetasB){

	var recetas_a_mostrar = recetasB.FILAS.length;
	let todas = document.getElementById('resultadosBusqueda');


	for(let x =0 ; x<recetas_a_mostrar;x++){


		//JSON

		var titulo = recetasB.FILAS[recetasCreadas].nombre,
			autor  = recetasB.FILAS[recetasCreadas].autor,
			comentarios  = recetasB.FILAS[recetasCreadas].comentarios,
			pos  = recetasB.FILAS[recetasCreadas].positivos,
			neg  = recetasB.FILAS[recetasCreadas].negativos,
			foto   = recetasB.FILAS[recetasCreadas].fichero,
			desripcion  = recetasB.FILAS[recetasCreadas].descripcion_foto,
			fecha  = recetasB.FILAS[recetasCreadas].fecha,
			id  = recetasB.FILAS[recetasCreadas].id;

		//Codigo HTML

		var articulo =

			`<div>
				<section>
					<header>
					<a href="receta.html?${id}" title=${titulo}>
					<img src="fotos/${foto}" alt="${desripcion}">
					<h3>${titulo}</h3>
					</a>
					</header>

					<footer>
						<p>
						<span><a href="buscar.html?autor=${autor}">${autor}</span><br>
						<time datetime="${fecha}">${fecha}</time><br>
						<button><span class="icon-thumbs-up-alt"></span>34</button>
						<button><span class="icon-thumbs-down-alt"></span>1</button>
						<button><span class="icon-chat"></span>2</button>
						</p>
					</footer>

				</section>
			</div>`;



			todas.innerHTML+= articulo;
			
			

	}
}


//Pedir recetas para el INDEX
function pedirEntradas(){

	console.log('HE ENTRADO A PEDIR ENTRADAS')
	let xhr = new XMLHttpRequest(),
		url = 'rest/receta/?u=6';
	var totalRecetas = 0;
		
	xhr.open('GET',url, true);
	xhr.onload = function(){
		var recetas = JSON.parse(xhr.responseText);			
		console.log(recetas);

			ponerRecetas(recetas);

			totalRecetas = document.getElementById('totalRecetas');
			paginaActual = document.getElementById('paginaActual');
			

			totalRecetas.innerHTML = Math.ceil((recetas.FILAS.length)/6); // redondeamos hacia arriba
			botonesIndex(recetas.FILAS.length);
			console.log('ENTROOOOOO');
		

		};

		xhr.send();


	}



function ponerRecetas(recetas){

	var recetas_a_mostrar = 6;
	let todas = document.getElementById('visorRecetas');


	for(let x =0 ; x<recetas_a_mostrar;x++){


		//JSON

		var titulo = recetas.FILAS[recetasCreadas].nombre,
			autor  = recetas.FILAS[recetasCreadas].autor,
			comentarios  = recetas.FILAS[recetasCreadas].comentarios,
			pos  = recetas.FILAS[recetasCreadas].positivos,
			neg  = recetas.FILAS[recetasCreadas].negativos,
			foto   = recetas.FILAS[recetasCreadas].fichero,
			desripcion  = recetas.FILAS[recetasCreadas].descripcion_foto,
			fecha  = recetas.FILAS[recetasCreadas].fecha,
			id  = recetas.FILAS[recetasCreadas].id;

		//Codigo HTML

		var articulo =

			`<div>
				<section>
					<header>
					<a href="receta.html?${id}" title=${titulo}>
					<img src="fotos/${foto}" alt="${desripcion}">
					<h3>${titulo}</h3>
					</a>
					</header>

					<footer>
						<p>
						<span><a href="buscar.html?autor=${autor}">${autor}</span><br>
						<time datetime="${fecha}">${fecha}</time><br>
						<button><span class="icon-thumbs-up-alt"></span>34</button>
						<button><span class="icon-thumbs-down-alt"></span>1</button>
						<button><span class="icon-chat"></span>2</button>
						</p>
					</footer>

				</section>
			</div>`;



			todas.innerHTML+= articulo;
			recetasCreadas++;
			console.log('Recetas Creadas: ' + recetasCreadas);

	}
}


function botonesIndex(total){

	var paginaActual = document.getElementById('paginaActual');

	if(recetasCreadas<=6){

		paginaActual.innerHTML = numPagActual;

	}else{


	}

}


// 4 funciones para los botones del index
function pincharBotonDer(){

	let botonDer = document.getElementById('paginaActual');
	
	


	if(numPagActual<Math.ceil((recetasCreadas)/6)){
		botonDer.innerHTML = (numPagActual+1);
		numPagActual++;
	}

}

function pincharBotonIzq(){

	let botonIzq = document.getElementById('paginaActual');
	


	if(numPagActual>1){
		botonIzq.innerHTML = (numPagActual-1);
		numPagActual--;
	}

}

function primeraPag(){

	let pag = document.getElementById('paginaActual');

	pag.innerHTML = 1;
	paginaActual=1;

}


function ultimaPag(){

	let pag = document.getElementById('paginaActual');

	pag.innerHTML = Math.ceil((recetasCreadas)/6);
	paginaActual=Math.ceil((recetasCreadas)/6);

	
}
	 

	