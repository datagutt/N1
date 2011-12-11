(function(N1, global, doc, undefined){
	"use strict";
	if(N1 && N1.isHostMethod && N1.isHostMethod(N1, 'extend') && N1.isHostMethod(N1, 'setOpacity')){
		N1.extend({effects:{
			fadeIn: function(selector, duration){
				var $el = N1.getElement(selector), timer, i = 0;
				if(!duration){
					var duration = 1000;
				}
				/* 
					TODO: Find out how handle duration
				*/
				if($el.style.opacity > 0 && $el.style.opacity !== 1){
					return;
				}
				clearInterval(timer);
				timer = setInterval(function() {
					if(i >= 100){
						clearInterval(timer);
						return;
					}
					N1.setOpacity(selector, (i / 10));
					i++;
				});
				return $el;
			},
			fadeOut: function(selector, duration){
				var $el = N1.getElement(selector), timer, i = 0;
				if(!duration){
					var duration = 1000;
				}
				/* 
					TODO: Find out how handle duration
				*/
				if($el.style.opacity < 1 && $el.style.opacity !== 0){
					return;
				}
				clearInterval(timer);
				timer = setInterval(function() {
					if(i >= 100){
						clearInterval(timer);
						return;
					}
					N1.setOpacity(selector, 1 - (i / 10));
					i++;
				});
				return $el;
			}
		}});
	}
})(window.N1, window, document, undefined);