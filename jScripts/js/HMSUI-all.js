/**
 *  HMSTabs v1.0 (c) Copyright 2007 Elvis Navarro Vega ( http://www.unipamplona.edu.co )
 *	@autor: Ing Elvis Navarro Vega
 *  @email: elvisnv@unipamplona.edu.co 
 *	Grupo de Desarrollo Plataforma - Universidad de Pamplona.
 *  Grupo de Trabajo Hermesoft 
 *  Plataforma - Direccion de Interaccion Social y Desarrollo Tecnologico
 *	Pamplona, Norte de Santander. Colombia.
 *	Septiembre del 2009
 *	@descripcion :	Manejo de objeto con manipulacion de Ajax, contiene Tabs, y metodos de uso general, para uso
 *					de las instancias del portal.
 *
 */
 
 
function getID() {
	var results = [], element;
  	for ( var i = 0; i < arguments.length; i++ ) {
    	element = arguments [ i ] ;
    	if (typeof element == 'string')
      		element = document.getElementById ( element ) ;
    	results [ results.length ] = element ;
  	}
  	
	return ( results.length < 2 ? results [ 0 ] : results ) ;
}

var $A = Array.from = function ( iterable ) {
	if (!iterable) return [];
  	if ( iterable.toArray ) {
    	return iterable.toArray() ;
  	} else {
    	var results = [];
    	for (var i = 0; i < iterable.length; i++)
      		results.push ( iterable [ i ] ) ;
    	return results ;
  	}
}

Object.extend = function ( destination, source ) {
	for ( var property in source )
    	destination [ property ] = source [ property ] ;
  	return destination;
}

Function.prototype.bind = function() {
	var __method = this, args = $A(arguments), object = args.shift();
	return function() {
    	return __method.apply ( object, args.concat ( $A(arguments) ) ) ;
  	}
}

var Class = {
	create: function () {
    	return function () {
      		this.initialize.apply ( this, arguments ) ;
    	}
  	}
};

var Execute = {
	these : function () {
    	var returnValue;
		for (var i = 0; i < arguments.length; i++ ) {
			var funcion = arguments [ i ] ;
      		try {
        		returnValue = funcion ();
        		break;
      		} catch (e) {}
    	}
    	return returnValue;   
  	}
};

XHR = {
	create : function () {
		return Execute.these(
			function() { return new XMLHttpRequest () },
		  	function() { return new ActiveXObject ( 'Msxml2.XMLHTTP' ) },
		  	function() { return new ActiveXObject ( 'Microsoft.XMLHTTP' ) }
		) || false ;
	}	
};

ER = {
	scriptFragment	: '<script[^>]*>([\\S\\s]*?)<\/script>',
	scriptInclude  	: '<script[^>]*><\/script>',
	scriptSrc		: '(src=)(.)*\.js(.)?',
	apos	 		: '[\"|\']'
}

Object.extend ( String.prototype, {
/*	
	trim : function () {	
		return ( this.replace( /^\s+|\s+$/g, '' ) ) ;	
	},
	
	hmsdelete : function ( beginning, length ) {
		var s = '' ;
		if ( beginning > 0 ) s = this.substring( 0, beginning ) ;
		if ( beginning + length < this.length )
			s += this.substring( beginning + length , this.length ) ;
		return s ;
	},
	
	isEmpty : function () {
		if ( this == '' || this == null || 
				typeof this == 'undefined' || this.trim() == '' ) 
			return true ;
		return false ;
	}, 
	
	isEmail : function () {
		return ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test ( this ) ) ;	
	},
	
	isTime : function () {
		var RE_TIME = /^(0\d|1\d|2[0-3]):([0-5]\d):([0-5]\d)$/ ;
		if ( RE_TIME.exec ( this ) )
			return true ;
		return false ;	
	},
	
	isDate : function () {
		var RE_DATE = /^([012][1-9]|[123]0|3[1])-(0[1-9]|1[012])-((1[9]|2[0])\d{2})$/ ;
		if ( RE_DATE.exec ( this ) )
			return true ;
		return false ;	
	},
	
	isDateTime : function () {
		var RE_DATETIME = /^([012][1-9]|[123]0|3[1])-(0[1-9]|1[012])-((1[9]|2[0])\d{2}) (0\d|1\d|2[0-3]):([0-5]\d):([0-5]\d)$/ ;
		if ( RE_DATETIME.exec ( this ) )
			return true ;
		return false ;	
	},
	
	isInteger : function () {
		return ( parseInt ( this, 10) == ( Number ( this ) * 1 ) ) ;
	},

	isFlotante : function () {
		return ( parseFloat ( this, 10) == ( Number ( this ) * 1 ) );		
	}, 
	
	isAlphanumeric : function () {
		return ( /^[\w\sñÑáéíóúÁÉÍÓÚ]+$/.test ( this ) ) ;		
	},
*/	

  	stripScripts : function() {
    	return this.replace ( new RegExp ( ER.ScriptFragment, 'img' ), '' ) ;
  	},

  	extractScripts : function( type ) {
		switch ( type ) {		
			case 'content' :
				var matchAll = new RegExp ( ER.scriptFragment, 'img' ) ;
				var matchOne = new RegExp ( ER.scriptFragment, 'im' ) ;
				return ( this.match ( matchAll ) || [] ).map ( function ( scriptTag ) {
					return ( scriptTag.match ( matchOne ) || ['', ''] )[1] ;
				});
				break ;
			
			case 'include' :
				var matchAll = new RegExp ( ER.scriptInclude, 'img' ) ;
				return ( this.match ( matchAll ) || [] ) ;
				break ;
		}
  	},

  	evalScripts : function() {
		var js = document.createElement ( 'script' ) ;
    	this.extractScripts( 'content' ).map ( 
			function ( script ) {
				if ( ! script.isEmpty () ) {
					js.text += script ;	
				}
			} 
		) ;
		document.getElementsByTagName('head')[0].appendChild ( js ) ;
  	},	
	
	includeScripts : function () {
		this.extractScripts( 'include' ).map ( 
			function ( scriptTag ) {
				var matchSrc = new RegExp ( ER.scriptSrc, 'ig' ) ;
				var m = ( scriptTag.match ( matchSrc ) || [] )[0] ;
				if ( m ) {
					m = m.substr ( 4 ).trim () ;
					var matchApos = new RegExp ( ER.apos, 'g' ) ;
					var js = document.createElement ( 'script' ) ;
					js.src = ( matchApos.test ( m ) ? m.substring ( 1, m.length - 1 ) : m ) ;
					document.getElementsByTagName('head')[0].appendChild ( js );		
				}
			}											  
		) ;
	}

} ) ;
 

/**
 * Manejo estandar de objetos que puedan implementar estos metodos de manera diferente ...
 */
var $break    = new Object();
var $continue = new Object();
 
var Enumeration = {
	each : function ( iterator ) {
		var index = 0;
		try {
			this.itera ( function ( value ) {
				try {
					iterator ( value, index ++ ) ;
				} catch (e) {
					if (e != $continue) throw e ;
				}
			} ) ;
		} catch (e) {
			if (e != $break) throw e;
		}
	},
	
	map : function ( iterator ) {
		var results = [];
		this.each ( function ( value, index ) {
			results.push ( iterator ( value, index ) ) ;
		} );
		return results;
	},

  	find : function ( iterator ) {
    	var result ;
    	this.each ( function ( value, index ) {
			if ( iterator ( value, index ) ) {
        		result = value ;
				throw $break ;
			}
    	} );
    	return result;
  	},
	
	property : function ( keyValue ) {
    	var results = [] ;
    	this.each ( function ( value ) {
			results.push ( value [ keyValue ] ) ;
    	});
    	return results;
  	}
}

Object.extend ( Array.prototype, Enumeration ) ;
Object.extend ( Array.prototype, {
	add : function ( element ) {
		this [ this.length ] = element ;		
	},
	
	itera : function ( iterator ) {
		for ( var i = 0; i < this.length ; i ++ )
			iterator ( this [ i ] );
	},
	
	size : function () {
		return ( this.length ) ;		
	},
	
	isEmpty : function () {
		return ( this.length > 0 ? false : true ) ;	
	}
	
} ) ;


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

HmsUI = window.HmsUI || {} ;

HmsUI.emptyFunction = function() {}


Object.extend(HmsUI,{
	Event:{
		add : function ( element, evname, eventListener, useCapture ) {
			useCapture = useCapture || false ;
			if ( element.attachEvent )
				element.attachEvent ( 'on' + evname, eventListener ) ;	// IE
			else if ( element.addEventListener ) 
				element.addEventListener ( evname, eventListener, useCapture ) ; // Gecko / W3C
			else 
				element [ 'on' + evname ] = eventListener ;
		},
		
		remove : function ( element, evname, eventListener, useCapture ) {
			useCapture = useCapture || false ;
			if ( element.detachEvent )
				element.detachEvent ( 'on' + evname, eventListener ) ;	// IE
			else if ( element.removeEventListener ) 
				element.removeEventListener ( evname, eventListener, useCapture ) ; // Gecko / W3C
			else 
				element [ 'on' + evname ] = new Function ( 'return false' ) ;
		}
	}
});


Object.extend(HmsUI,{
	Tabs:{
		initialize:function(ul){
			var lst = $A(getID(ul).getElementsByTagName('li'));
			for (var i=0; i < lst.length; i++)
				this.assigneEvent (lst[i], ul);
		},
		
		assigneEvent:function (li, ul){
			HmsUI.Event.add (li, 'click', function(){
				HmsUI.Tabs.selected (li, ul);										   
			});
		},
		
		selected:function(li,parent){
			var lst = $A(getID(parent).getElementsByTagName('li'));
			for (var i=0; i < lst.length; i++)
				lst[i].className = '';	
			li.className='selected';
		}
		
	}	
});

HmsUI.Ajax = Class.create () ;
Object.extend (HmsUI.Ajax.prototype, {
	initialize : function ( url, container, options ) {
		this.transport	= XHR.create();
		this.container	= getID(container);
		this.url 		= url;
		this.setOptions (options);
		this.Events		= ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];
	},
	
	setOptions : function ( options ) {
		this.options = {
	  		method:       	'post',
	  		asynchronous:	true,
	  		contentType:  	'application/x-www-form-urlencoded',
	  		parameters:   	'',
			type:			'html', 
			evalScripts:	true,
			error:			true,
			msgWait:		'loading ...',
			msgError:		'Ocurri&oacute; un error',
			encoding:		'UTF-8'
		}
		Object.extend ( this.options, options || {} ) ;
	},
	
	waitingIndicator : function () {
		if ( this.container )
			this.container.innerHTML = this.options.msgWait ;	
	},
	
	loadOnComplete : function () {
		var onComplete = this.options.onComplete || HmsUI.emptyFunction;
		this.options.onComplete = ( function ( hmsAjax ) {
			this.content() ;
		  	onComplete ( hmsAjax ) ;
		}).bind ( this ) ;		
	},
	
	content : function () {
		if ( this.transport.status == 200 )	{
			if ( this.container ) {			
				switch ( this.options.type ) {
					case 'html' :	
						var response = this.transport.responseText ;
						if ( ! this.options.evalScripts )
							response = response.stripScripts() ;
							
						this.container.innerHTML = response.stripScripts () ;
						setTimeout ( function() { response.evalScripts () }, 10 ) ;
						setTimeout ( function() { response.includeScripts () }, 10 ) ;
						break ; 
				}			
			}
		} else {
			if ( this.options.error ) {
				if ( this.container )
					this.container.innerHTML = this.options.msgError ;		
			}
		}
	},

	request : function () {
		this.loadOnComplete () ;
		this.waitingIndicator () ;	
		var parameters = this.options.parameters || '' ;
      	
		if ( this.options.method == 'get' && parameters.length > 0)
        	this.url += ( this.url.match ( /\?/ ) ? '&' : '?') + parameters ;

		if ( this.options.asynchronous ) {
        	this.transport.onreadystatechange = this.onStateChange.bind ( this ) ;
        	setTimeout ( ( function() { this.respondToReadyState ( 1 ) } ).bind ( this ), 10 ) ;
      	}
		
      	this.transport.open ( this.options.method, this.url, this.options.asynchronous ) ;
		this.setRequestHeaders () ;
      	this.transport.send ( this.options.method == 'post' ? parameters : null ) ;
	},
	
	onStateChange : function () {
    	if ( this.transport.readyState != 1 )
      		this.respondToReadyState ( this.transport.readyState ) ;
  	},
	
	respondToReadyState : function ( readyState ) {
    	var event = this.Events [ readyState ] ;

    	if ( event == 'Complete' ) {
      		try {
        		( this.options [ 'on' + this.transport.status ]	
					|| this.options [ 'on' + ( this.success() ? 'Success' : 'Failure' ) ]			
					|| HmsUI.emptyFunction )( this ) ;
      		} catch (e) {}
    	}
		
		try {
			( this.options [ 'on' + event ] || HmsUI.emptyFunction )( this ) ;
		} catch (e) {}

    	/* Evita la perdida de memoria in MSIE: limpia el manejador del evento cuando se ha completado */
    	if (event == 'Complete')
      		this.transport.onreadystatechange = HmsUI.emptyFunction ;
  	},
  
	setRequestHeaders: function() {
    	
		var headers = [] ; 
    	if ( this.options.method == 'post' ) {
      		headers.push ('Content-type', this.options.contentType + 
						  	(this.options.encoding ? '; charset=' + this.options.encoding : '')	) ;
			
      		/* Se Forza "Connection: close" para los navegadores Mozilla */
      		if ( this.transport.overrideMimeType )
        		headers.push ( 'Connection', 'close' ) ;
    	}
		
    	for ( var i = 0; i < headers.length; i += 2 )
			this.transport.setRequestHeader ( headers [ i ], headers [ i + 1 ] ) ;
			
  	},
	
	success : function () {
		var status = this.getStatus () ;
		return ! status || ( status >= 200 && status < 300 ) ;
	},
	
  	getStatus: function() {
    	try {
      		return this.transport.status || 0;
    	} catch (e) { return 0 }
  	}
	
} );






