(function(N1, global, doc, undefined){
	"use strict";
	if(N1 && N1.isHostMethod && N1.isHostMethod(N1, 'extend')){
		N1.extend({
			getElement: function(selector){
				var $el;
				if(this.isHostMethod(doc, 'querySelector')){
					$el = doc.querySelector(selector);
				}else if(selector.search("#")==0){
					selector = selector.slice(1);
					if(this.isHostMethod(doc, 'getElementById')){
						$el = doc.getElementById(selector);
					}
				}else if(selector.search("#")==0){
					selector = selector.slice(1);
					$el = this.getByClass($el)[0];
				}
				return $el;
			},
			getElements: function(selector){
				var $els;
				if(this.isHostMethod(doc, 'querySelectorAll')){
					$els = doc.querySelectorAll(selector);
				}else if(selector.search("#")==0){
					selector = selector.slice(1);
					if(this.isHostMethod(doc, 'getElementById')){
						$els = doc.getElementById(selector);
					}
				}else if(selector.search("#")==0){
					selector = selector.slice(1);
					$els = this.getByClass($el);
				}
				return $els;
			},
			getByClass: function(el){
				var els = [], allElements = [], match;
				if(this.isHostMethod(doc, 'getElementsByClassName')){
					els = doc.getElementsByClassName(el);
				}else if(this.isHostMethod(doc, 'getElementsByTagName')){
					allElements = doc.getElementsByTagName("*");
				}else if(this.isHostMethod(doc, 'all')){
					allElements = doc.all;
				}
				if(allElements.length){
					this.forEach(allElements, function(i, current){
						match = (current.className == el);
						if(match){
							els.push(current);
						}
					});
				}
				return els;
			},
			getAttribute: function(selector, attr){
				var $el = this.getElement(selector);
				return $el && $el[attr] ? $el[attr] : "";
			},
			getHtml: function(selector, html){
				var $el = this.getElement(selector);
				if($el && $el.innerHTML){
					return $el.innerHTML;
				}
				return $el;
			},
			getCSS: function(selector, attr){
				var $el, $value;
				$el = this.getElement(selector);
				$value = $el && $el.style[attr] ? $el.style[attr] : "";
				return $value;
			},
			setAttribute: function(selector, name, value){
				var $el = this.getElement(selector);
				$el[name] = value;
				return $el;
			},
			setAttributes: function(selector, attrs){
				var $el = this.getElement(selector);
				this.forEach(attrs, function(attr, value){
					$el[attr] = value;
				});
				return $el;
			},
			setHtml: function(selector, html){
				var $el = this.getElement(selector);
				if($el && $el.innerHTML){
					$el.innerHTML = html;
				}
				return $el;
			},
			setCSS: function(selector, attrs){
				var $el = this.getElement(selector);
				this.forEach(attrs, function(attr, value){
					if($el && $el.style){
						$el.style[attr] = value;
					}
				});
				return $el;
			}
		});
	}
})(window.N1, window, document, undefined);