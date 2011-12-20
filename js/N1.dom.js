/*
	N1 0.1 | github.com/datagutt/N1 
	DOM module
*/
(function(N1, global, doc, undefined){
	"use strict";
	if(N1 && N1.isFeature && N1.isFeature('extend')){
		N1.extend({
			readyArray: [],
			getElement: function(selector){
				var $el;
				if(!selector){
					return;
				}
				if(N1.isHostMethod(doc, 'querySelector')){
					$el = doc.querySelector(selector);
				}else if(selector.search("#")==0){
					selector = selector.slice(1);
					if(N1.isHostMethod(doc, 'getElementById')){
						$el = doc.getElementById(selector);
					}
				}else if(selector.search(".")==0){
					selector = selector.slice(1);
					$el = N1.getByClass(selector)[0];
				}
				return $el;
			},
			getElements: function(selector){
				var $els;
				if(!selector){
					return;
				}
				if(N1.isHostMethod(doc, 'querySelectorAll')){
					$els = doc.querySelectorAll(selector);
				}else if(selector.search("#")==0){
					selector = selector.slice(1);
					if(N1.isHostMethod(doc, 'getElementById')){
						$els = doc.getElementById(selector);
					}
				}else if(selector.search(".")==0){
					selector = selector.slice(1);
					$els = N1.getByClass(selector);
				}
				return $els;
			},
			getByClass: function(el){
				var els = [], allElements = [], match = false;
				if(N1.isHostMethod(doc, 'getElementsByClassName')){
					els = doc.getElementsByClassName(el);
				}else if(N1.isHostMethod(doc, 'getElementsByTagName')){
					allElements = doc.getElementsByTagName("*");
				}else if(N1.isHostMethod(doc, 'all')){
					allElements = doc.all;
				}
				if(allElements.length){
					N1.forEach(allElements, function(i, current){
						if(N1.isFeature("getAttribute")){
							match = (N1.getAttribute(current, "className") == el);
						}
						if(match){
							els.push(current);
						}
					});
				}
				return els;
			},
			documentReady: function(func){
				var currentFunc, init = function(){
					N1.forEach(N1.readyArray, function(i, func){
						if(N1.isFunction(func)){
							func();
						}
					});
				}
				N1.readyArray.push(func);
				if(N1.isHostMethod(document, 'addEventListener')){
					N1.addEvent(document, 'DOMContentLoaded', init);
				}else if(!N1.isHostMethod(window,'onload')){
					window.onload = init;
				}
			},
			addEvent: function(selector, type, handler){
				var $el = N1.isObject(selector) ? selector : N1.getElement(selector);
				if(N1.isHostMethod($el, 'addEventListener')){
					$el.addEventListener(type, handler, false);
				}else if(N1.isHostMethod($el, 'attachEvent')){
					$el.attachEvent("on"+type, handler);  
				}else if($el["on"+type]){
					$el["on"+type] = handler;
				}
			},
			getAttribute: function(selector, attr){
				var $el = N1.isObject(selector) ? selector : N1.getElement(selector), attr;
				if(N1.isHostMethod($el, 'getAttribute')){
					attr = $el.getAttribute(attr);
				}else{
					/* this will fail for alot of attributes (class etc) */
					attr = $el[attr];
				}
				return attr;
			},
			getHtml: function(selector, html){
				var $el = N1.isObject(selector) ? selector : N1.getElement(selector);
				if($el && $el.innerHTML){
					return $el.innerHTML;
				}
				return $el;
			},
			getStyle: function(selector, attr){
				var $el, $value;
				$el = N1.isObject(selector) ? selector : N1.getElement(selector);
				if(!attr){
					return;
				}
				$value = $el && $el.style && $el.style[attr] ? $el.style[attr] : "";
				return $value;
			},
			getOpacity: function(selector){
				var $el, $filter = 0;
				$el = N1.isObject(selector) ? selector : N1.getElement(selector);
				if(!($el && $el.style)){
					return;
				}
				if($el.style["opacity"]){
					$filter = $el.style["opacity"];
				}else if($el.style["MozOpacity"]){
					$filter = $el.style["MozOpacity"];
				}else if($el.style["KhtmlOpacity"]){
					$filter = $el.style["KhtmlOpacity"];
				}else if($el.style["filter"]){
					$filter = $el.style["filter"]
						.replace(')','')
						.replace('alpha(opacity=','') * 10;
				}
				return parseFloat($filter);
			},
			showElement: function(selector){
				var $el = N1.isObject(selector) ? selector : N1.getElement(selector);
				N1.setStyle($el, "display", "block");
			},
			hideElement: function(selector){
				var $el = N1.isObject(selector) ? selector : N1.getElement(selector);
				N1.setStyle($el, "display", "none");
			},
			setAttribute: function(selector, attr, value){
				var $el = N1.isObject(selector) ? selector : N1.getElement(selector);
				if(N1.isHostMethod($el, 'setAttribute')){
					$el.setAttribute(attr, value);
				}else{
					/* this will fail for alot of attributes (class etc) */
					$el[attr] = value;
				}
				return $el;
			},
			setAttributes: function(selector, attrs){
				N1.forEach(attrs, function(attr, value){
					N1.setAttribute(selector, attr, value);
				});
				return true;
			},
			setHtml: function(selector, html){
				var $el = N1.isObject(selector) ? selector : N1.getElement(selector);
				if($el && $el.innerHTML){
					$el.innerHTML = html;
				}
				return $el;
			},
			setOpacity: function(selector, level){
				var $el = N1.isObject(selector) ? selector : N1.getElement(selector);
				if(level > 1){
					level = 1;
				}
				N1.setStyle($el, 'opacity', level);
				N1.setStyle($el, '-moz-opacity', level);
				N1.setStyle($el, '-khtml-opacity', level);
				N1.setStyle($el, 'filter', 'alpha(opacity=' + (level * 100) + ');');
			},
			setStyle: function(selector, attr, value){
				var $el = N1.isObject(selector) ? selector : N1.getElement(selector);
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
			},
			removeStyle: function(selector, attr){
				var $el = N1.isObject(selector) ? selector : N1.getElement(selector);
				if($el && $el.style){
					$el.style[attr] = false;
				}
				return $el;
			},
			removeEvent: function(selector, type, handler){
				var $el = N1.isObject(selector) ? selector : N1.getElement(selector);
				if(N1.isHostMethod($el, 'removeEventListener')){
					$el.removeEventListener(type, handler, false);
				}else if(N1.isHostMethod($el, 'detachEvent')){
					$el.detachEvent("on"+type, handler);  
				}else if($el["on"+type]){
					$el["on"+type] = false;
				}
			},
			removeAttribute: function(selector, attr){
				var $el = N1.isObject(selector) ? selector : N1.getElement(selector); 
				if(N1.isHostMethod($el, 'removeAttribute')){
					$el.removeAttribute(attr);
				}else{
					$el[attr] = false;
				}
			}
		});
	}
})(window.N1, window, document, undefined);