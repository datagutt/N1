(function(global, undefined){
	"use strict";
	var _N1 = global.N1;
	var N1 = {
		version: 0.1,
		isHostMethod: function(object, property){
			var t = typeof object[property];  
			return t==='function' ||
				(!!(t==='object' && object[property])) ||
				t==='unknown';
		},
		isArray: function(obj){
			return obj.constructor === Array && obj instanceof Array;
		},
		isFunction: function(obj){
			return obj.constructor === Function && obj instanceof Function;
		},
		isObject: function(obj){
			/* If its a HTML element, .constructor.constructor will return Object */
			return obj && obj.constructor && (obj.constructor === Object || obj.constructor.constructor === Object) && obj instanceof Object;
		},
		isString: function(obj){
			return obj.constructor === String;
		},
		extend: function(object, prop){
			if(!prop){
				prop = object;
				object = this;
			}
			for (var i in prop) {
				if(N1.isHostMethod(prop, 'hasOwnProperty') && prop.hasOwnProperty(i)){
					object[i] = prop[i];
				}
			}
			return object;
		},
		forEach: function(element, callback){
			for(var i in element){
				/* hasOwnProperty not available on dom objects in IE :O */
				if(N1.isHostMethod(Object, 'hasOwnProperty') && Object.hasOwnProperty.call(element, i)){
					try{
						callback(i, element[i]);
					}catch(e){
						/* put logging function here once done */
					}
				}
			}
			return element;
		},
		isFeature: function(){
			var a = arguments.length;
			while(a--){
				if(N1[arguments[a]]){
					return true;
				}
			}
			return false;
		},
		noConflict: function(name){
			global.N1 = _N1;
		},
		changeNamespace: function(name){
			global[name] = N1;
			global.N1 = null;
		}
	};
	if(N1 in global){
		throw new Error("N1 already defined!");
	}else{
		window.N1 = N1;
	}
})(window, undefined);