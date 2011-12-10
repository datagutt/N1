(function(N1, global, doc, undefined){
	"use strict";
	if(N1 && N1.isHostMethod && N1.isHostMethod(N1, 'extend')){
		N1.extend({
			getElement: function(selector){
				var $el;
				if(N1.isHostMethod(doc, 'querySelector')){
					$el = doc.querySelector(selector);
				}else if(selector.search("#")==0){
					selector = selector.slice(1);
					if(N1.isHostMethod(doc, 'getElementById')){
						$el = doc.getElementById(selector);
					}
				}else if(selector.search("#")==0){
					selector = selector.slice(1);
					$el = N1s.getByClass($el)[0];
				}
				return $el;
			},
			getElements: function(selector){
				var $els;
				if(N1.isHostMethod(doc, 'querySelectorAll')){
					$els = doc.querySelectorAll(selector);
				}else if(selector.search("#")==0){
					selector = selector.slice(1);
					if(N1.isHostMethod(doc, 'getElementById')){
						$els = doc.getElementById(selector);
					}
				}else if(selector.search("#")==0){
					selector = selector.slice(1);
					$els = N1.getByClass($el);
				}
				return $els;
			},
			getByClass: function(el){
				var els = [], allElements = [], match;
				if(N1.isHostMethod(doc, 'getElementsByClassName')){
					els = doc.getElementsByClassName(el);
				}else if(N1.isHostMethod(doc, 'getElementsByTagName')){
					allElements = doc.getElementsByTagName("*");
				}else if(N1.isHostMethod(doc, 'all')){
					allElements = doc.all;
				}
				if(allElements.length){
					N1.forEach(allElements, function(i, current){
						match = (current.className == el);
						if(match){
							els.push(current);
						}
					});
				}
				return els;
			},
			getAttribute: function(selector, attr){
				var $el = N1.getElement(selector);
				return $el && $el[attr] ? $el[attr] : "";
			},
			getHtml: function(selector, html){
				var $el = N1.getElement(selector);
				if($el && $el.innerHTML){
					return $el.innerHTML;
				}
				return $el;
			},
			getStyle: function(selector, attr){
				var $el, $value;
				$el = N1.getElement(selector);
				if(!attr){
					return;
				}
				$value = $el && $el.style[attr] ? $el.style[attr] : "";
				return $value;
			},
			setAttribute: function(selector, attr, value){
				var $el = N1.getElement(selector);
				$el[attr] = value;
				return $el;
			},
			setAttributes: function(selector, attrs){
				N1.forEach(attrs, function(attr, value){
					N1.setAttribute(selector, attr, value);
				});
				return true;
			},
			setHtml: function(selector, html){
				var $el = N1.getElement(selector);
				if($el && $el.innerHTML){
					$el.innerHTML = html;
				}
				return $el;
			},
			setStyle: function(selector, attr, value){
				var $el = N1.getElement(selector);
				if($el && $el.style){
					$el.style[attr] = value;
				}
				return $el;
			},
			setStyles: function(selector, attrs){
				N1.forEach(attrs, function(attr, value){
					N1.setStyle(selector, attr, value);
				});
				return true;
			}
		});
	}
})(window.N1, window, document, undefined);