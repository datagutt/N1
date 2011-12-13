(function(N1, global, doc, undefined){
	"use strict";
	if(N1 && N1.isHostMethod && N1.isHostMethod(N1, 'extend') && N1.isHostMethod(N1, 'setOpacity')){
		N1.extend({effects:{
			fadeIn: function(selector, duration){
				var $el = N1.getElement(selector), timer, i = N1.getOpacity(selector);
				if(!duration){
					duration = 1000;
				}
				/* 
					TODO: Find out how handle duration
				*/
				if($el.style.opacity > 0.01){
					return;
				}
				clearInterval(timer);
				timer = setInterval(function() {
					if(i >= 1){
						clearInterval(timer);
						return;
					}
					N1.setOpacity(selector, i);
					i += 0.01;
				});
				return $el;
			},
			fadeOut: function(selector, duration){
				var $el = N1.getElement(selector), timer, i = 0;
				if(!duration){
					duration = 1000;
				}
				/* 
					TODO: Find out how handle duration
				*/
				if($el.style.opacity < 0.9){
					return;
				}
				clearInterval(timer);
				timer = setInterval(function() {
					if(i >= 1){
						clearInterval(timer);
						return;
					}
					N1.setOpacity(selector, 1 - i);
					i += 0.01;
				});
				return $el;
			}
		}});
	}
})(window.N1, window, document, undefined);