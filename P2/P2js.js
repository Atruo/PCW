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
						<button onclick="like();"><span class="icon-thumbs-up-alt"></span>${pos}</button>
						<button onclick="dislike();"><span class="icon-thumbs-down-alt"></span>${neg}</button>
						<button><span class="icon-chat"></span>${comentarios}</button>
						</p>
					</footer>

				</section>
			</div>`;


			if(articulo!=null){
			todas.innerHTML+= articulo;
			recetasCreadas++;
			console.log('Recetas Creadas: ' + recetasCreadas);
			}

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

/////////////////////////////////////////////////////////////////////////
//								BUSCAR
/////////////////////////////////////////////////////////////////////////

function compruebaUsuario() {
  // Comprobar tipo de busqueda
  var url_string = window.location.href;
  var url = new URL(url_string);
  var user = url.searchParams.get("a");
  var submit = url.searchParams.get("submit");
  var pagina = url.searchParams.get("pag");
  console.log("user:");
  console.log(user);
  if( user != undefined )
  {
    // Si hay usuario en la URL se realiza la consulta
    console.log("Usuario activo: ");
    console.log(user);
    var url_u = "rest/receta/?a="+user;
    fetch( url_u )
    .then(
      function(response){
        if( response.status !== 200 )
        {
          console.log("Error fetch usuario en buscar.");
        }
        response.json().then( function(data){
          console.log("data: ");
          console.log(data);
          // Si el JSON es OK

          var docu = getElementById('resultadosBusqueda');
          for (var i = 0; i < data.FILAS.length; i++) {
            docu.innerHTML +=
           `<div>
				<section>
					<header>
					<a href="receta.html?id=`+data.FILAS[i].id+ `" title=`+data.FILAS[i].nombre+`>
					<img src="fotos/`+data.FILAS[i].fichero+`" alt="` + data.FILAS[i].nombre + `">
					<h3>`+data.FILAS[i].nombre+`</h3>
					</a>
					</header>

					<footer>
						<p>
						<span><a href="buscar.html?autor=` + data.FILAS[i].autor + `">` + data.FILAS[i].autor + `</span><br>
						<time datetime="` + data.FILAS[i].fecha + `">` + data.FILAS[i].fecha + `</time><br>
						<button><span class="icon-thumbs-up-alt"></span>` + data.FILAS[i].positivos + `</button>
						<button><span class="icon-thumbs-down-alt"></span>` + data.FILAS[i].negativos + `</button>
						<button><span class="icon-chat"></span>` + data.FILAS[i].comentarios + `</button>
						</p>
					</footer>

				</section>
			</div>`;

          }
        });
      })
    .catch( function( err ) {

    })

  }
  else if( (submit != undefined) || (typeof(pagina) != "undefined" && pagina !== null) )
  {
    // Si usuario ha rellenado formulario O pagina
    var titulo = url.searchParams.get("busqueda");
    console.log("titulo: ");
    console.log(titulo);
    var ingredientes = url.searchParams.get("ingredientes");
    console.log("ingredientes: ");
    console.log(ingredientes);
    var tmin = url.searchParams.get("tiempomin");
    console.log("tmin: ");
    console.log(tmin);
    var tmax = url.searchParams.get("tiempomax");
    console.log("tmax: ");
    console.log(tmax);
    var dificultad = url.searchParams.get("dificultad");
    console.log("difi: ");
    console.log(dificultad);
    var comensales = url.searchParams.get("comensales");
    console.log("comensales: ");
    console.log(comensales);
    var autor = url.searchParams.get("autor");
    console.log("autor: ");
    console.log(autor);
    if( ( submit=="Buscar" && titulo=="" && ingredientes=="" && tmin=="" && tmax=="" && dificultad=="" && comensales=="" && autor=="" ) )
    {
      // Usuario no ha introducido ningun valor en la busqueda
      pedirEntradas();
    }
    else {
      // Si introduce cualquier otra cosa -> realizar busqueda
      var link = "rest/receta/?";
      // Si ha realizado una busqueda

        var params = [];

        if(typeof(titulo) != "undefined" && titulo !== null && titulo != "" ){
          params.t = titulo.replace(/\s+/g, ',');
        }

        if(typeof(ingredientes) != "undefined" && ingredientes !== null && ingredientes != "" ){
          params.i = ingredientes.replace(/\s+/g, ',');
        }

        if(typeof(tmin) != "undefined" && tmin !== null && tmin != "" ){
          params.di = tmin;
        }

        if(typeof(tmax) != "undefined" && tmax !== null && tmax != "" ){
          params.df = tmax;
        }

        if(typeof(dificultad) != "undefined" && dificultad !== null && dificultad != "" ){
          params.d = dificultad;
        }

        if(typeof(comensales) != "undefined" && comensales !== null && comensales != "" ){
          params.c = comensales;
        }

        if(typeof(autor) != "undefined" && autor !== null && autor != "" ){
          params.a = autor;
        }

        params.pag = 0;
        params.lpag = 4;
        if(typeof(pagina) != "undefined" && pagina !== null){
          params.pag = pagina;
          var records = url.searchParams.get("lpag");
          if(typeof(records) != "undefined" && records !== null){
            params.lpag = records;
          }
        }

        var url_params = build_params(params).replace(/\%2C/g,',');
        link += url_params;
        console.log("params:");
        console.log(url_params);
        console.log("link:");
        console.log(link);

        fetch(link)
        .then( function(response){
          if(response.status !== 200){
            console.log("Error status");
          }
          response.json().then(function( search ) {
            console.log("search: ");
            console.log(search);

            var cont = document.getElementById('resultadosBusqueda');

            if(search.FILAS.length > 0){

              // Muestra infor

              var i;
              for(i=0;i<4;i++)
              {
                cont.innerHTML +=
               `<div>
				<section>
					<header>
					<a href="receta.html?id=`+search.FILAS[i].id+ `" title=`+search.FILAS[i].nombre+`>
					<img src="fotos/`+search.FILAS[i].fichero+`" alt="` + search.FILAS[i].nombre + `">
					<h3>`+search.FILAS[i].nombre+`</h3>
					</a>
					</header>

					<footer>
						<p>
						<span><a href="buscar.html?autor=` + search.FILAS[i].autor + `">` + search.FILAS[i].autor + `</span><br>
						<time datetime="` + search.FILAS[i].fecha + `">` + search.FILAS[i].fecha + `</time><br>
						<button><span class="icon-thumbs-up-alt"></span>` + search.FILAS[i].positivos + `</button>
						<button><span class="icon-thumbs-down-alt"></span>` + search.FILAS[i].negativos + `</button>
						<button><span class="icon-chat"></span>` + search.FILAS[i].comentarios + `</button>
						</p>
					</footer>

				</section>
			</div>`;
;

              }
              // paginacion
              console.log("tot:");
              console.log(search.TOTAL_COINCIDENCIAS);
              paginacion(search.TOTAL_COINCIDENCIAS,4);
            }
            else{
              // No resultados
              cont.innerHTML +=
              `
              <article class="card">
              <p>No se han encontrado resultados.</p>
              </article>
              `;
            }
          })
        })
        .catch( function(err){
          console.log("Error catch", err);
        });

    }


  }
  else
  {
    // Si ha entrado en buscar.html sin parametros ni nada
    pedirEntradas();
    console.log("pagina: ");
    console.log(pagina);
  }
}

function build_params(data) {
  let ret = [];
  for (let pos in data){
    ret.push(encodeURIComponent(pos) + "=" + encodeURIComponent(data[pos]));
  }
  return ret.join('&');
}



////////////////////////////////////////////////////////////////////////////////////
//										RECETA
////////////////////////////////////////////////////////////////////////////////////

var id_global; // id de la receta a tratar
var pos_global;
var neg_global;
var com_global;

function darReceta(){
	console.log('ENTRO EN --DAR RECETA');
  var url = window.location.href;
  var id = url.split('.html?');
  var mostrar;



  if(id[1]!=undefined)
  	{

  		var url_string = window.location.href;
  		var url = new URL(url_string);
  		var user = url.searchParams.get("id");

  		

   		if(user!= 'undefined' && user!= null){
   			let extraa = url_string.split('id=');

   			mostrar = 'rest/receta/'+extraa[1];
   			id_global = extraa[1];
   		}else{
   	  		mostrar = 'rest/receta/'+id[1];
   	  		id_global = id[1];
   		}
   	 
   	 pedirRecetasB(mostrar);
	}
}


function pedirRecetasB(url){

	
	let xhr = new XMLHttpRequest();
		
	
		
	xhr.open('GET',url, true);
	xhr.onload = function(){
		var recetasB = JSON.parse(xhr.responseText);			
		

			ponerRecetasB(recetasB);	
			console.log('DOY LA RECETA A PROCESAR');

		};

		xhr.send();
}

function ponerRecetasB(recetasB){


	var recetas_a_mostrar = recetasB.FILAS.length;
	let ela = document.getElementById('elaboracionRec');
	let cab = document.getElementById('cabeceraRec');


	for(var i =0 ; i<recetas_a_mostrar;i++){


		//Codigo HTML

		var cabecera =

			 `<div>
				
					<header>
					<a href="receta.html?id=`+recetasB.FILAS[i].id+ `" title=`+recetasB.FILAS[i].nombre+`>
					<img src="fotos/`+recetasB.FILAS[i].fichero+`" alt="` + recetasB.FILAS[i].nombre + `">
					<h3>`+recetasB.FILAS[i].nombre+`</h3>
					</a>
					</header>				
				
			</div>`;
			conseguirIngredientes(recetasB.FILAS[i].id);

		var elaboracion =

			 `<div>
					<h4 id="elaboracionRec">` + recetasB.FILAS[i].elaboracion + `</h4>
					
					<p>
					<span><a href="buscar.html?autor=` + recetasB.FILAS[i].autor + `">` + recetasB.FILAS[i].autor + `</a></span><br>
					<time datetime="` + recetasB.FILAS[i].fecha + `">` + recetasB.FILAS[i].fecha + `</time><br>
					</p>
							
				
			</div>`;





			cab.innerHTML+= cabecera;
			ela.innerHTML+= elaboracion;
			
			
			

	}

	let pos = document.getElementById('textoLike'),
		neg = document.getElementById('textoDislike'),
		com = document.getElementById('textoComent');

		pos.innerHTML= recetasB.FILAS[i-1].positivos;
		neg.innerHTML= recetasB.FILAS[i-1].negativos;
		com.innerHTML= recetasB.FILAS[i-1].comentarios;

		pos_global = recetasB.FILAS[i-1].positivos;
		neg_global = recetasB.FILAS[i-1].negativos;
		com_global = recetasB.FILAS[i-1].comentarios;
}

function conseguirIngredientes(id){

	let xhr = new XMLHttpRequest();
		
	let url = 'rest/receta/'+id+'/ingredientes';
		
	xhr.open('GET',url, true);
	xhr.onload = function(){
		var ingredientes = JSON.parse(xhr.responseText);			
		

			ponerIngredientes(ingredientes);	
			conseguirComentarios(id);
			

		};

		xhr.send();

}

function ponerIngredientes(ingredientes){
	var recetas_a_mostrar = ingredientes.FILAS.length;
	let ing = document.getElementById('ingredientesRec');
	ing.innerHTML = `<h2>Ingredientes:</h2><br>`


	for(let i =0 ; i<recetas_a_mostrar;i++){


		//Codigo HTML

		var ingredient =

			 `<div>
					
					<h4 id="listaIngredientes">`+ingredientes.FILAS[i].nombre+`</h4>			
				
			</div>`;
		



			ing.innerHTML+= ingredient;
			
			
			
			

	}
		ingredient= `<br><br>`
		ing.innerHTML+= ingredient;
}

function conseguirComentarios(id){

	let xhr = new XMLHttpRequest();
		
	let url = 'rest/receta/'+id+'/comentarios';
		
	xhr.open('GET',url, true);
	xhr.onload = function(){
		var comentarios = JSON.parse(xhr.responseText);			
		

			
			ponerComentarios(comentarios);
			

		};

		xhr.send();

}
function ponerComentarios(coments){

	var recetas_a_mostrar = coments.FILAS.length;
	let com = document.getElementById('coments');
	


	for(let i =0 ; i<recetas_a_mostrar;i++){


		//Codigo HTML

		var comentarios =

			`	
				<a>
				<h5 title="`+coments.FILAS[i].titulo+`">`+coments.FILAS[i].autor+` -- `+coments.FILAS[i].fecha+`</h5> 
				</a>
				<h4>`+coments.FILAS[i].titulo+`</h4>
				<p id="comentarios">`+coments.FILAS[i].texto+`</p>
			 `;
		



			com.innerHTML+= comentarios;
			
			
			
			

	}
		
}
function like(){


  let xhr = new XMLHttpRequest(),
  	fd  = new FormData(),
	url = 'rest/receta/' + id_global + '/voto/1',
  	usu;

  if(xhr){

    usu = JSON.parse(sessionStorage.getItem('usuario'));

    fd.append('l',usu.login);

    xhr.open('POST', url, true);
    xhr.onload = function(){
  	   console.log(xhr.responseText);

       let r = JSON.parse(xhr.responseText);

     	 if(r.RESULTADO == "OK"){
        	//actualiza();
        	let pos = document.getElementById('textoLike');
        	let text = document.getElementById('valoracionOK');

        	pos_global++;
       		pos.innerHTML=(pos_global);

       		text.style.display = 'block'; 
    		

       } else {
         //mostrarModal("03");
       }
    }
    xhr.setRequestHeader('Authorization', usu.clave);
    xhr.send(fd);
  }
}
function dislike(){


  let xhr = new XMLHttpRequest(),
  	fd  = new FormData(),
	url = 'rest/receta/' + id_global + '/voto/0',
  	usu;

  if(xhr){

    usu = JSON.parse(sessionStorage.getItem('usuario'));

    fd.append('l',usu.login);

    xhr.open('POST', url, true);
    xhr.onload = function(){
  	   console.log(xhr.responseText);

       let r = JSON.parse(xhr.responseText);

     	 if(r.RESULTADO == "OK"){
        	//actualiza();
        	let pos = document.getElementById('textoDislike');
        	let text = document.getElementById('valoracionOK');

        	neg_global++;
       		pos.innerHTML=(neg_global);

       		text.style.display = 'block'; 
    		

       } else {
         //mostrarModal("03");
       }
    }
    xhr.setRequestHeader('Authorization', usu.clave);
    xhr.send(fd);
  }
}

function cerrarValOK(){


	let text = document.getElementById('valoracionOK');

	text.style.display = 'none'; 
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//													REGISTRO
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

function check(form) {
  let fd = new FormData(form),
  xhr = new XMLHttpRequest(),
  url = './rest/usuario/';

  xhr.open('POST', url, true);

  xhr.onload = function(){
  	console.log(xhr.responseText);
  	let r = JSON.parse(xhr.responseText);

  	if(r.RESULTADO=='OK'){
        document.getElementById("registroForm").reset();
        let r = document.getElementById('registroOK'),
        	s = document.getElementById('loginReg');

        r.style.display = 'block';
        s.style.display = 'none';



  		console.log(r);
    }
  }
  xhr.send(fd);

  return false;
}

function checkUser(value){
  let xhr = new XMLHttpRequest(),
  url = './rest/login/' + value;

  xhr.open('GET', url, true);

  xhr.onload = function(){
    let r = JSON.parse(xhr.responseText);

    if(r.RESULTADO=='OK'){
      var texto = document.getElementById("usuarioStatus");
        if(r.DISPONIBLE){
          texto.innerHTML = "Usuario disponible";
          texto.style.color = "#4BB543";
        } else {
          texto.innerHTML = "Usuario NO disponible";
          texto.style.color = "#B22222";
        }
    } else {
      document.getElementById("usuarioStatus").innerHTML = "";
    }
  }

  xhr.send();

  return false;
}

function checkKey(e){
  if (e.which == 32)
    return false;
}

function noSpace(){
  var str = document.getElementById("nickname").value;
  var res = str.replace(/\s/g, "");
  document.getElementById("nickname").value = res;
}

var contras;
function getCon(pass){
	contras = pass;
}
function coincidir(){

	let con2 = document.getElementById('contrasena2').value,
		text = document.getElementById('contrasenaDistinta');
		console.log(contras);
		console.log(con2);

		if(contras!=con2){
			text.innerHTML= 'No coincide';
			 text.style.color = "#B22222";
		}else{
			text.innerHTML= 'Coincide';
			 text.style.color = "#4BB543";
		}




}
