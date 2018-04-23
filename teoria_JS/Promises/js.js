


function lanzarPromesa(){

	promesa.then(function(datos){
		//TODO BIEN
			console.log('desde la promesa');
			console.log(datos);
	},function(msjError){
		//VA MAL

	});

}
function peticionAJAX(){

		let xhr = new XMLHttpRequest(), 
	url = './rest/receta/?pag=0&lapg=6';


	xhr.open('GET',url, true);
	xhr.onload = function(){
			resolve(xhr.responseText);
		
	};

	xhr.onerror('ERROR EN LA PETICION')


	xhr.send();
}

function miFETCH(url, init){

	return new Promise(function(resolve, reject){
	let xhr = new XMLHttpRequest(); 
	


	xhr.open('GET',url, true);
	xhr.onload = function(){
			resolve(xhr.responseText);
		
	};

	xhr.onerror = function(){
		reject('ERROR EN LA PETICION');
	};


	xhr.send();
});

function lanzarMiFetch(){
	miFETCH('./rest/receta/?pag=0lpag=6').then(
		function(datos){
			//TODO BIEN
			console.log('desde mi FETCH');
			console.log(datos);
		}, function(msjError){
			//Se ha producido un error
			console.log(msjError);
		});
};