/*
	N1 0.1 | github.com/datagutt/N1 
	Core module
*/
(function(global){
	"use strict";
	var _N1 = global.N1;
	var N1 = {
		version: 0.1,
		isHostMethod: function(object, method){
			var t = typeof object[method];  
			return t==='function' ||
				(!!(t==='object' && object[method])) ||
				t==='unknown';
		},
		isHostProperty: function(object, property){
			var t = typeof object[property];  
			return !!((t==='function' || t==='object') && object[property]);
		},
		isString: function(obj){
			return typeof obj === 'string';
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
			global.N1 = undefined;
		}
	};
	if(N1 in global){
		throw new Error("N1 already defined!");
	}else{
		window.N1 = N1;
	}
})(window);