(function(N1, global, doc, undefined){
	"use strict";
	if(N1 && N1.isHostMethod && N1.isHostMethod(N1, 'extend') && N1.isHostMethod(N1, 'setOpacity')){
		N1.extend({effects:{
			fadeIn: function(selector, duration){
				var $el = N1.getElement(selector), timer, i = N1.getOpacity(selector);
				
				if(isNaN(duration)){
					duration = 1000;
				} 
				try{
					clearInterval($el._time);	//If some animation is set, clear it
					var step = ( duration / ( ( 1 - i ) * 100 ) );	//Calculate time of step
					$el._timer = setInterval(function(){
						i = N1.getOpacity(selector);
						if(i >= 1){
							return clearInterval($el._timer)
						}
						N1.setOpacity(selector, i + 0.01);
					}, step);
				}catch(e){}
				return $el;
			},
			fadeOut: function(selector, duration){
				var $el = N1.getElement(selector), timer, i = N1.getOpacity(selector);
				
				if(isNaN(duration)){
					duration = 1000;
				}
				try{
					clearInterval($el._time);	//If some animation is set, clear it
					var step = ( duration / ( i * 100 ) );	//Calculate time of step
					
					$el._timer = setInterval(function(){
						i = N1.getOpacity(selector);
						if(i <= 0){
							return clearInterval($el._timer);
						} 
						N1.setOpacity(selector, i - 0.01);
					}, step);
				}catch(e){}
				return $el;
			}
		}});
	}
})(window.N1, window, document, undefined);