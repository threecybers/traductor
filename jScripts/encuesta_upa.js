
var encuestaUPA = {
	/**
	 * id: id del recurso como tal
	 * page: pagina para el registro de la encuesta ejecutada
	 * te: tamano encuesta - cadena 'width=300 , height = 300'
	 */
	votar: function (id, page, te){
		try {
			var opcion = document.getElementById('opc_sel_' + id); 
			if (opcion != null){
				if (opcion.value.length == 0){  
					alert ("Debe seleccionar por lo menos una de las opciones de la encuesta.");
				} else {
					var pagina = page + '?idEncuesta=' + id + '&idRespuesta=' + opcion.value;
					window.open(pagina,'encuesta_' + id, te + ',menubar=no,scrollbars=no,toolbar=no,location=no,directories=no,resizable=no,top=0,left=0');
				}
			}else{ 
				alert('Objeto no válido para el registro de la encuesta');
			}
		} catch (e) {
			alert ("La encuesta no se puede procesar en esta página");
		}	
	}, 
	
	/**
	 * id: id del recurso como tal
	 * page: pagina para el registro de la encuesta ejecutada
	 * te: tamano encuesta - cadena 'width=300 , height = 300'
	 */
	ver: function (id, page, te){
		var opcion = document.getElementById('opc_sel_' + id); 
		var pagina = page + '?idEncuesta=' + id + '&idRespuesta=' + opcion.value;
		window.open(pagina,'encuesta_' + id, te + ',menubar=no,scrollbars=no,toolbar=no,location=no,directories=no,resizable=no,top=0,left=0');
	},

	/**
	 * id: id del recurso como tal
	 * page: pagina para el registro de la encuesta ejecutada
	 * to: tamano opinion - cadena 'width=300 , height = 300'
	 */
	sugerencia: function (id, page, to){
		var opcion = document.getElementById('opc_sel_' + id); 
		var pagina = page + '?idEncuesta=' + id + '&idRespuesta=' + opcion.value;
		window.open(pagina,'encuesta_' + id, to + ',menubar=no,scrollbars=no,toolbar=no,location=no,directories=no,resizable=no,top=0,left=0');
	},

	/**
	 * id: id del recurso como tal
	 * page: pagina para el registro de la encuesta ejecutada
	 * to: tamano opinion - cadena 'width=300 , height = 300'
	 */
	abierta: function (id, page, to){
		var opcion = document.getElementById('opc_sel_' + id); 
		var pagina = page + '?idEncuesta=' + id + '&idRespuesta=' + opcion.value;
		window.open(pagina,'encuesta_' + id, to + ',menubar=no,scrollbars=no,toolbar=no,location=no,directories=no,resizable=no,top=0,left=0');
	}

};


