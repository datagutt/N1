(function(N1, global, doc, undefined){
	"use strict";
	if(N1 && N1.isHostMethod && N1.isHostMethod(N1, 'extend') && N1.isHostMethod(N1, 'setOpacity')){
		N1.extend({effects:{
			fadeIn: function(selector, duration){
				var $el = N1.getElement(selector), $value;
				if(!duration){
					var duration = 1000;
				}
				for (var i = 0; i <= 1; i += 0.01) {
					setTimeout("N1.setOpacity('" + selector + "'," + i + ")", i * duration);
				}
				return $el;
			},
			fadeOut: function(selector, duration){
				var $el = N1.getElement(selector), $value;
				if(!duration){
					var duration = 1000;
				}
				for (var i = 0; i <= 1; i += 0.01) {
					setTimeout("N1.setOpacity('" + selector + "'," + (1 - i) + ")", i * duration);
				}
				return $el;
			}
		}});
	}
})(window.N1, window, document, undefined);