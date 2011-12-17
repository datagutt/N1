(function(N1, global, doc, undefined){
	"use strict";
	if(N1 && N1.isHostMethod && N1.isHostMethod(N1, 'extend') && N1.isHostMethod(N1, 'setOpacity')){
		N1.extend({effects:{
			fadeIn: function(selector, duration){
				var $el = N1.isObject(selector) ? selector : N1.getElement(selector),
					timer,
					i = N1.getOpacity($el);
				
				if(isNaN(duration)){
					duration = 1000;
				} 
				try{
					clearInterval($el._timer);	/*If some animation is set, clear it*/
					var step = ( duration / ( ( 1 - i ) * 100 ) );	/*Calculate time of step*/
					$el._timer = setInterval(function(){
						i = N1.getOpacity($el);
						if(i >= 1){
							return clearInterval($el._timer)
						}
						N1.setOpacity($el, i + 0.01);
					}, step);
				}catch(e){
					N1.showElement($el);
				}
				return $el;
			},
			fadeOut: function(selector, duration){
				var $el = N1.isObject(selector) ? selector : N1.getElement(selector),
					timer,
					i = N1.getOpacity($el);
				
				if(isNaN(duration)){
					duration = 1000;
				}
				try{
					clearInterval($el._timer);	/*If some animation is set, clear it*/
					var step = ( duration / ( i * 100 ) );	/*Calculate time of step*/
					
					$el._timer = setInterval(function(){
						i = N1.getOpacity($el);
						if(i <= 0){
							return clearInterval($el._timer);
						} 
						N1.setOpacity($el, i - 0.01);
					}, step);
				}catch(e){
					N1.hideElement($el);
				}
				return $el;
			}
		}});
	}
})(window.N1, window, document, undefined);