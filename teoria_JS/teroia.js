
var a = 10;




function prueba(){

	console.log('Hola soy PACO');


}

function prueba2(){

	for(var i=0; i<5; i++)
		console.log('El valor de i es: ' + i)
}

 function prueba3(){

	var b=67;

	if(!b){
		console.log('b es undefined');
	}else{
		console.log('b es: '+b);
	}
}


function prueba4(){

	var v = [6, 'hola',true, 7.45, , 'buenos dias'];
	console.log(v);
	console.log(v[2]);
	v[4]=345;
	console.log(v);

	let [a,,b]=v;
	console.log('a: '+a);
	console.log('b: '+b);
}

function prueba5(){
	var a ="4";

	console.log('a: '+a);
	a=parseInt(a,10)+1;
	console.log('a: '+a);
	a=a-1;
	console.log('a: '+a);


}




function prueba6(){
	console.log('Hola, quieres seso?');
	return false;
}



function prueba7(){

	var persona = {'dni':'123456789A','nombre':'juan','apellidos':'Garcia dsad','edad':'82'}
	console.log('Nombre:'+persona.nombre);
}

function prueba8(){
	var nombre ='Maria';
	console.log('(1) Mi nombre es '+nombre);
	console.log(`(2) Mi nombre es ${nombre}`);
}
