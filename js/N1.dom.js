if(N1 && N1.isHostMethod && N1.isHostMethod(N1, 'extend')){
	N1.extend({
		getElement: function(selector){
			var $el;
			if(this.isHostMethod(document,'querySelectorAll')){
					$el = document.querySelectorAll(selector);
				}else if(this.isHostMethod(document,'getElementsById')){
					/* ugly hack */
					if(selector.search("#")==0){
						selector = selector.slice(1);
					}
					$el = document.getElementsById(selector);
				}else{
					$el = [];
				}
				return $el;
			},
			getAttribute: function(selector, attr){
				var $el = this.getElement(selector)[0];
				return $el && $el[attr] ? $el[attr] : "";
			},
			getCSS: function(selector, attr){
				var $el, $value;
				$el = this.getElement(selector)[0];
				$value = $el && $el.style[attr] ? $el.style[attr] : "";
				return $value;
			},
			setAttribute: function(selector, name, value){
				var $el = this.getElement(selector)[0];
				$el[name] = value;
				return $el;
			},
			setAttributes: function(selector, attrs){
				var $el = this.getElement(selector)[0];
				this.forEach(attrs,function(attr,value){
					$el[attr] = value;
				});
				return $el;
			},
			setCSS: function(selector, attrs){
				var $el = this.getElement(selector)[0];
				this.forEach(attrs,function(attr,value){
					if($el.style){
						$el.style[attr] = value;
					}
				});
				return $el;
			}
		});
}