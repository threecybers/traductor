/*
	@autor: Grupo de Programaci?n
	Universidad de Pamplona.
	Pamplona (Norte de Santander). Colombia.
	Mayo 15 del 2006
	validaciones.js
	Version para PortalIG - Hermesoft
*/


function esVacio(valor){
	if ( valor==null ) { return true; }
	for ( var i=0; i < valor.length; i++) {
		if ((valor.charAt(i)!=' ')&&(valor.charAt(i)!="\t")&&(valor.charAt(i)!="\n")&&(valor.charAt(i)!="\r")){return false;}
	}
	return true;
}

function mouseEvento (objImagen, imagen) {
	document.images[objImagen].src = imagen;
}

function abrirVentana (theURL,winName,features) { 
  window.open(theURL,winName,features);
}

//--> funcion que retorna la fecha y hora actual. (DD dd de MMMM de YYYY)
function $() {
	var results = [], element;
	for ( var i = 0; i < arguments.length; i++ ) {
		element = arguments [ i ] ;
		if (typeof element == 'string')
			element = document.getElementById ( element ) ;
		results [ results.length ] = element ;
	}
	return ( results.length < 2 ? results [ 0 ] : results ) ;
}

function fncCurrentDate () {
	var months = new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
	var weekdays = new Array("Domingo","Lunes","Martes","Mi&eacute;rcoles","Jueves","Viernes","S&aacute;bado");
	
	var today = new Date();
	var month = today.getMonth();
	var date = today.getDate();
	var weekday = today.getDay();
	var year = today.getYear();
	if (year < 1900)
		year = 1900 + year;

	return (weekdays[weekday] + ' ' + date + ' de ' + months[month] + ' de ' + year ) ;
}

function mostrarocultar( obj ){
	var actual = document.getElementById ( obj ) ;
	v = document.getElementById ( obj ) ;
	v = v.style;
	if (v.display == "block"){
		b = false;
	}else{
	    b = true;
	}	
	var s = (b) ? "block":"none";
	if (v.display != s){
		v.display = s;
	}

}