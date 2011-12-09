(function(global, undefined){
	"use strict";
	var _N1 = global.N1;
	var N1 = {
		version: 0.1,
		isHostMethod: function(object, property){
			var t = typeof object[property];  
			return t=='function' ||
         		(!!(t=='object' && object[property])) ||
				t=='unknown';
		},
		isArray: function(obj){
			return obj.constructor == Array && obj instanceof Array;
		},
		extend: function(object, prop){
			if(!prop){
				var prop = object;
				var object = this;
			}
			for (var i in prop) {
				object[i] = prop[i];
			}
			return object;
		},
		forEach: function(element, callback){
			for(var i in element){
				callback(i,element[i]);
			}
			return element;
		},
		noConflict: function(name){
			global.N1 = _N1;
		}
	}
	if(N1 in global){
		throw new Error("N1 already defined!");
	}else{
		window.N1 = N1;
	}
})(window, undefined);