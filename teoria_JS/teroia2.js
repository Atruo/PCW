function anyadirFinal(){

	let ul = document.querySelector('ul'), //let o var, da igual (el let si se pone en un bucle solo estará en ese bucle)
		li;

	li=document.createElement('li');
	li.innerHTML = '<a href="https://www.google.es">GOOGLE</a>';
	//li.textContent = '<a href="https://www.google.es">GOOGLE</a>';    Este solo crear el texto no el enlace
	ul.appendChild(li);

}

function anyadirPos3(){

	let ul = document.querySelector('ul'), //let o var, da igual (el let si se pone en un bucle solo estará en ese bucle)
		li;

	li=document.createElement('li');
	li.innerHTML = '<a href="https://www.google.es">GOOGLE</a>';

	ul.insertBefore(li,ul.querySelector('li:nth-of-type(3)'));

}



function mostrarRecetas(){

	let html = '';
	v.FILAS.forEach( function(e, idx,vector) {

			html += '<li>${e.nombre}</li>';
	});
	
	document.querySelector('ul').innerHTML=html;
	
}

//Utilizando AJAX
function pedirReceta(){

	let xhr = new XMLHttpRequest(),
		url = './rest/receta/?u=6';

	xhr.open('GET',url, true);
	xhr.onload = function(){
		console.log(xhr.responseText);
		let r = JSON.parse(xhr.responseText);
		console.log(r);
		if(r.RESULtADO=='OK'){
				mostrarRecetas(r);
		}
	};

	xhr.send();


}

function hacerLogin(frm){

	let xhr = new  XMLHttpRequest(),
		url ='./rest/login/';
		fd = new  FormData(frm);

		xhr.open('POST', url, true);
		xhr.onload=function(){
			console.log(xhr.responseText);
		};
		xhr.send(fd);
		return false;



}