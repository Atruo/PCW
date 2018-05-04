var recetas;
var totalRecetasTOT = 6;  // numero de receras creadas hasta la fecha
var numPagActual = 1;    //Numero de la pagina actual
var idActual = 0;    // ultima receta mostrada


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



var largo;

//Pedir recetas para el INDEX
function pedirEntradas(){

	console.log('HE ENTRADO A PEDIR ENTRADAS')
	let xhr = new XMLHttpRequest(),
		url = 'rest/receta/?u=50';
	var totalRecetas = 0;
		
	xhr.open('GET',url, true);
	xhr.onload = function(){
		var recetas = JSON.parse(xhr.responseText);			
		console.log(recetas);

			ponerRecetas(recetas);

		

			
			botonesIndex(recetas);
			largo=recetas;
			console.log('ENTROOOOOO');
		

		};

		xhr.send();


	}



	

function ponerRecetas(recetas){
	var recetas_a_mostrar = recetas.FILAS.length;
	
	let todas = document.getElementById('visorRecetas1');
	let todas2 = document.getElementById('visorRecetas2');
	let todas3 = document.getElementById('visorRecetas3');
	


	for(var x=0; x<recetas_a_mostrar;x++){


		//JSON

		var titulo = recetas.FILAS[x].nombre,
			autor  = recetas.FILAS[x].autor,
			comentarios  = recetas.FILAS[x].comentarios,
			pos  = recetas.FILAS[x].positivos,
			neg  = recetas.FILAS[x].negativos,
			foto   = recetas.FILAS[x].fichero,
			desripcion  = recetas.FILAS[x].descripcion_foto,
			fecha  = recetas.FILAS[x].fecha,
			id  = recetas.FILAS[x].id;

		//Codigo HTML

		var articulo =

			`<div>
				<section>
					
					<a href="receta.html?${id}" title=${titulo}>
						<img src="fotos/${foto}" alt="${desripcion}">
					</a>
					<div>
					<a href="receta.html?${id}" title=${titulo}>
						<h3>${titulo}</h3>
					</a>
					
					

						<footer>
							<p>
								<span><a href="buscar.html?autor=${autor}">${autor}</a></span><br>
								<time datetime="${fecha}">${fecha}</time><br>
								<button onclick="like();"><span class="icon-thumbs-up-alt"></span>${pos}</button>
								<button onclick="dislike();"><span class="icon-thumbs-down-alt"></span>${neg}</button>
								<button><span class="icon-chat"></span>${comentarios}</button>
							</p>
						</footer>
					</div>

				</section>
			</div>`;


			if(articulo!=null){

				if(x<6){
					todas.innerHTML+= articulo;
				}else if(x>=6&&x<13){
						todas2.innerHTML+= articulo;
					}else{
						todas3.innerHTML+= articulo;
					}




			}


	}



	if(x%2!=0){

			articulo =
			`<div>
				<section>
					
					<a href="receta.html?" title=>
						<img src="fotos/noReceta.jpg" alt="">
					</a>
					<div>
					
						<h3>No hay más recetas</h3>
					
					
					

						<footer>
							<p>
								<span><a href="buscar.html?autor=""></a></span>None<br>
								<time datetime="">None</time><br>
								<span>None</span><br><br>
								<button onclick="like();"><span class="icon-thumbs-up-alt">0</span></button>
								<button onclick="dislike();"><span class="icon-thumbs-down-alt">0</span></button>
								<button><span class="icon-chat">0</span></button>
							</p>
						</footer>
					</div>

				</section>
			</div>`

			

				if(x<6){
					todas.innerHTML+= articulo;
				}else if(x>=6&&x<13){
						todas2.innerHTML+= articulo;
					}else{
						todas3.innerHTML+= articulo;
					}

			}





			

	
	console.log('IDactual: '+idActual);
}


function botonesIndex(total){


	var paginaActual = document.getElementById('paginaActual');
	let r = document.getElementById('totalRecetas');

	totalRecetasTOT = total.FILAS.length;
	r.innerHTML = Math.ceil((total.FILAS.length)/6);
	paginaActual.innerHTML = numPagActual;
	


	

}


// 4 funciones para los botones del index
var clickDer =0;


;
function pincharBotonDer(){

	let botonDer = document.getElementById('paginaActual');
	
	


	if(numPagActual<Math.ceil((totalRecetasTOT)/6)){
		botonDer.innerHTML = (numPagActual+1);
		numPagActual++;
		let y = document.getElementById('visorRecetas3');
		let r = document.getElementById('visorRecetas2');
		let s = document.getElementById('visorRecetas1');
		if(clickDer==0){
			r.style.display = 'block';
			s.style.display = 'none';


		}else{
			r.style.display = 'none';
			y.style.display = 'block';
		}
		
		clickDer++;
		

	}

}

function pincharBotonIzq(){

	let botonIzq = document.getElementById('paginaActual');
	


	if(numPagActual>1){
		botonIzq.innerHTML = (numPagActual-1);
		numPagActual--;
		
		let r = document.getElementById('visorRecetas1');
		let s = document.getElementById('visorRecetas2');
		let y = document.getElementById('visorRecetas3');
		if(clickDer==1){
			r.style.display = 'block';
			s.style.display = 'none';
		}else{
			s.style.display = 'block';
			y.style.display = 'none'
		}
		clickDer--;
	}

}

function primeraPag(){

	let pag = document.getElementById('paginaActual');

	pag.innerHTML = 1;
	paginaActual=1;

	let r = document.getElementById('visorRecetas1');
	let s = document.getElementById('visorRecetas2');
	let y = document.getElementById('visorRecetas3');

		s.style.display = 'none';
		y.style.display = 'none';
		r.style.display = 'block';
		botonDer=0;


}


function ultimaPag(){

	let pag = document.getElementById('paginaActual');


	pag.innerHTML = Math.ceil((totalRecetasTOT)/6);
	paginaActual=Math.ceil((totalRecetasTOT)/6);

	let r = document.getElementById('visorRecetas1');
	let s = document.getElementById('visorRecetas2');
	let y = document.getElementById('visorRecetas3');

	if(Math.ceil((totalRecetasTOT)/6)==3){
		s.style.display = 'none';
		y.style.display = 'block';
		r.style.display = 'none';
		botonDer=2;

	}else{
		s.style.display = 'block';
		y.style.display = 'none';
		r.style.display = 'none';
		botonDer=1;
	}

	
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
					
					<a href="receta.html?id=`+data.FILAS[i].id+ `" title=`+data.FILAS[i].nombre+`>
						<img src="fotos/`+data.FILAS[i].fichero+`" alt="` + data.FILAS[i].nombre + `">
					</a>
					<div>
					<a href="receta.html?id=`+data.FILAS[i].id+ `" title=`+data.FILAS[i].nombre+`>
						<h3>`+data.FILAS[i].nombre+`</h3>
					</a>
					
					

						<footer>
							<p>
								<span>
									<a href="buscar.html?autor=` + data.FILAS[i].autor + `">` + data.FILAS[i].autor + `
									</a>
								</span><br>
								<time datetime="` + data.FILAS[i].fecha + `">` + data.FILAS[i].fecha + `</time><br>
								<button onclick="like();"><span class="icon-thumbs-up-alt"></span>` + data.FILAS[i].positivos + `</button>
								<button onclick="dislike();"><span class="icon-thumbs-down-alt"></span>` + data.FILAS[i].negativos + `</button>
								<button><span class="icon-chat"></span>` + data.FILAS[i].comentarios + `</button>
							</p>
						</footer>
					</div>

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
              	if(search.FILAS[i]!=undefined){
                cont.innerHTML +=

                `<div>
				<section>
					
					<a href="receta.html?id=`+search.FILAS[i].id+ `" title=`+search.FILAS[i].nombre+`>
						<img src="fotos/`+search.FILAS[i].fichero+`" alt="` + search.FILAS[i].nombre + `">
					</a>
					<div>
					<a href="receta.html?id=`+search.FILAS[i].id+ `" title=`+search.FILAS[i].nombre+`>
						<h3>`+search.FILAS[i].nombre+`</h3>
					</a>
					
					

						<footer>
							<p>
								<span>
									<a href="buscar.html?autor=` + search.FILAS[i].autor + `">` + search.FILAS[i].autor + `
									</a>
								</span><br>
								<time datetime="` + search.FILAS[i].fecha + `">` + search.FILAS[i].fecha + `</time><br>
								<button onclick="like();"><span class="icon-thumbs-up-alt"></span>` + search.FILAS[i].positivos + `</button>
								<button onclick="dislike();"><span class="icon-thumbs-down-alt"></span>` + search.FILAS[i].negativos + `</button>
								<button><span class="icon-chat"></span>` + search.FILAS[i].comentarios + `</button>
							</p>
						</footer>
					</div>

				</section>
			</div>`;

              }
             }
              // paginacion
              console.log("tot:");
              console.log(search.TOTAL_COINCIDENCIAS);
              
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//											NUEVA RECETA
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



var contador = 0;
var numFotos = 0;
var numIngredientes = 0;
var fotos = [];
var titulo;

function addIngrediente(ingrediente){

  var x = ingrediente.value;

  if(x!=""){
    var list = document.getElementById("ingredientes");

    // Crear el item li
    var item = document.createElement('li');

    // Poner el contenido
    item.appendChild(document.createTextNode(x));

    // Añadir a la lista
    list.appendChild(item);

    //Devolver el focus y resetear texto
    document.getElementById("ingrediente").value = '';
    document.getElementById("ingrediente").focus();
    numIngredientes++;
  } else {
    alert("No hay ingrediente");
  }

}

function addFoto(){

  var cont = document.getElementById("fotosReceta");
  var div = document.createElement('div');
  var id = "foto" + contador;
  div.className = 'imgcontainer';
  div.setAttribute("id", id);
  cont.appendChild(div);

  div.innerHTML +=
  `
  <p><button onclick="cerrarFicha(` + id + `)" class="icon-cancel"></button></p>
  <input onchange="getImg(this)" required id="` + contador + `" type="file" name="foto" accept="image/*">

  <p>Foto:</p>
  <img id="img` + contador + `" type="file" onclick="getImg(this)" accept="image/*()" src="fotos/15.png" alt="noimagen" style="cursor: pointer">

  <p>Descripción: </p>
  <textarea id="descripcion` + contador + `" name="descripcion` + contador + `" cols="30" rows="4"></textarea>
  `
  contador++;
}

function cerrarFicha(x){
  var id = x.id.split("foto");
  id = "img" + id[1];

  var src = document.getElementById(id).src;
  var img = src.split("http://localhost/pcw/practica02/fotos/");
  img = img[1];

  var index = -1;
  for(var i=0; i<fotos.length; i++){
    if(fotos[i].name == img){
      index = i;
    }
  }

  if(index > -1){
    fotos.splice(index, 1);
  }

  var elem = document.getElementById(x.id);
  elem.parentNode.removeChild(elem);

  return false;
}

function getImg(x){

  if(x.type == "file"){
    var file = x.files[0].size;
    var name = x.files[0].name;
    var img = document.getElementById("img" + x.id);
   
    if(file>300000){
      document.getElementById('tam3k').style.display='block';
      x = null;
    } else {
      img.src = "fotos/" + name;
      numFotos++;
      fotos.push(x.files[0]);

    }
  } else {

    var splited = x.id.split('img');
    var inputId = splited[1];
    var fileupload = document.getElementById(inputId);
    var image = document.getElementById(x.id);

    image.onclick = function () {
        fileupload.click();
    };
    fileupload.onchange = function () {
      var file = fileupload.files[0].size;
      var name = fileupload.files[0].name;

      if(file>300000){
        mostrarModal("01");
      } else {
          image.src = "fotos/" + name;
          numFotos++;
          fotos.push(fileupload.files[0]);
      }
    }
  }
}

function mandarReceta(form){
  if(numFotos>0){
    if(numIngredientes > 0){
      let xhr = new XMLHttpRequest(),
      fd  = new FormData(form),
      url = 'rest/receta/',
      usu;

      if(xhr){
        usu = JSON.parse(sessionStorage.getItem('usuario'));
        var dificultad;
        titulo = form.titulo.value;
        switch(form.dificultad.value){
          case 'baja': dificultad = 0; break;
          case 'media': dificultad = 1; break;
          case 'alta': dificultad = 2; break;
        }
        fd.append('l',usu.login);
        fd.append('n',titulo);
        fd.append('e',form.elaboracion.value);
        fd.append('t',form.tiempo.value);
        fd.append('d',dificultad);
        fd.append('c',form.comensales.value);

        xhr.open('POST', url, true);

        xhr.onload = function(){
           console.log(xhr.responseText);

           let r = JSON.parse(xhr.responseText);

           if(r.RESULTADO == "OK"){
             enviarIngredientes(r.ID);
             for(var i=0; i<fotos.length; i++){
               enviarFotos(r.ID, i);
               console.log(r.ID + '--'+i);
             }

             var i = 0;
             while(fotos.length>0){
               cerrarFicha(document.getElementById("foto"+i));
               i++;
             }
             document.getElementById("nuevaRecetaForm").reset();
             // Get the <ul> element with id="ingredientes"
             var list = document.getElementById("ingredientes");
             // If the <ul> element has any child nodes, remove its first child node
             while(list.hasChildNodes()) {
               list.removeChild(list.childNodes[0]);
             }
             let rrr = document.getElementById('recetaNew');
            	rrr.style.color = "#15F21A";
  				rrr.style.display = 'block';
  				
  				

           }else {
               mostrarModal("03");
           }
        }
        xhr.setRequestHeader('Authorization', usu.clave);
        xhr.send(fd);
      }
    } else {
      mostrarModal("04");
    }
  } else {
      mostrarModal("02");
  }

  return false;
}

function enviarIngredientes(id){
  let xhr = new XMLHttpRequest(),
  fd  = new FormData(),
  url = 'rest/receta/' + id + '/ingredientes',
  usu;

  if(xhr){
    var ul = document.getElementById("ingredientes");
    var vIngredientes = [];
    var i;

    for(i=0; i<ul.children.length; i++){
      vIngredientes.push(ul.childNodes[i].innerText);
    }

    usu = JSON.parse(sessionStorage.getItem('usuario'));

    fd.append('l',usu.login);
    fd.append('i',JSON.stringify(vIngredientes));
    console.log(fd);

    xhr.open('POST', url, true);
    xhr.onload = function(){
       console.log(xhr.responseText);

       let r = JSON.parse(xhr.responseText);

       if(r.RESULTADO == "OK"){
         console.log("imagen enviada a la BD");
       } else {
         console.log("nope");
       }
    }
    xhr.setRequestHeader('Authorization', usu.clave);
    xhr.send(fd);
  }
}

function enviarFotos(id, i){
  let xhr = new XMLHttpRequest(),
  fd  = new FormData(),
  url = 'rest/receta/' + id + '/foto',
  usu;

  console.log(url);
  var desc = document.getElementById("descripcion" + i).value;
  console.log(desc);

  if(xhr){
    usu = JSON.parse(sessionStorage.getItem('usuario'));

    fd.append('l',usu.login);
    fd.append('t',desc);
    fd.append('f',fotos[i]);
    console.log(fotos[i]);
    console.log(desc);
    console.log(fd);

    xhr.open('POST', url, true);
    xhr.onload = function(){
       console.log(xhr.responseText);

       let r = JSON.parse(xhr.responseText);

       if(r.RESULTADO == "OK"){
         console.log("fotos subidas al servidor")
       } else {
         console.log("nope");
       }
    }
    xhr.setRequestHeader('Authorization', usu.clave);
    xhr.send(fd);

    }
}

function mostrarModal(num){
  var modal = document.getElementById('id'+num);
  var span = document.getElementsByClassName("close")[num-1];
  modal.style.display='block';
  console.log("Mostrando modal: " + num);
	 modal.style.color = "#B22222";
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
         modal.style.display = "none";
         if(num == "05")
          window.location.href = "/pcw/practica02/index.html";
    }
  }
}

function quitarMensajeNew(){


	var r = document.getElementById('tam3k'),
		s = document.getElementById('id02'),
		t = document.getElementById('id04'),
		y = document.getElementById('recetaNew');

	r.style.display = 'none';
	s.style.display = 'none';
	t.style.display = 'none';
	y.style.display = 'none';
}