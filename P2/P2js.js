function hacerLogin(frm){

	let xhr = new XMLHttpRequest(),
		url = './rest/login/',
		fd  = new FormData(frm);

	xhr.open('POST',url,true);
	xhr.onload = function(){
		console.log(xhr.responseText);
		let r = JSON.parse(xhr.responseText);
		if(r.RESULTADO=='OK'){
			sessionStorage.setItem('usuario',xhr.responseText);
			console.log("Sesion Iniciada");
			location.href = "index.html";

		}else{
			console.log("Error en el login");

			alert("Error al hacer login");
			location.reload();

		}
	};
	xhr.send(fd);

	return false;

}

function comprobarStorage(){

	var login = sessionStorage.getItem('usuario');
	

	if(login){
		console.log('SE QUE ESTOY LOGEADO');
		
		document.getElementById('menu_login').innerHTML="";
		document.getElementById('menu_registro').innerHTML="";



	}else{
		console.log('NO ESTOY LOGEADO');
		document.getElementById('menu_nueva').innerHTML="";
		document.getElementById('menu_logout').innerHTML="";
	}

}

function cerrarSesion(){
	sessionStorage.clear();
}