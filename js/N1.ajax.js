/*
	N1 0.1 | github.com/datagutt/N1 
	Ajax module
*/
(function(N1, global){
	"use strict";
	if(N1 && N1.isFeature && N1.isFeature('extend')){
		N1.extend({ajax:{
			ArrayToURL: function(array) {
				var pairs = [];
				for (var key in array){
					if (N1.isHostMethod(array, 'hasOwnProperty') && array.hasOwnProperty(key)){
						pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(array[key]));
					}
				}
				return pairs.join('&');
			},
			XHR: function(){
				var obj;
				if(N1.isHostMethod(global, 'XMLHttpRequest')){
					obj = new XMLHttpRequest();
				}else if(N1.isHostMethod(global, 'ActiveXObject')){
					try{
						obj = new global.ActiveXObject("Msxml2.XMLHTTP");
					}catch(error1){
						try{
							obj = new global.ActiveXObject("Microsoft.XMLHTTP");
						}catch(error2){}
					}
				}
				return obj;
			},
			get: function(url, callback){
				var req = this.XHR();
				req.open('GET', url);
				req.onreadystatechange = function(){
					if(req.readyState===4){
						callback(req.responseText, req.status);
					}
				};
				req.send(null);
				return req;
			},
			post: function(url, params, callback){
				var req = this.XHR();
				params = this.ArrayToURL(params);
				req.open('POST', url);
				req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				req.onreadystatechange = function(){
					if(req.readyState===4){
						callback(req.responseText, req.status);
					}
				};
				req.send(params);
				return req;
			}
		}});
	}
})(window.N1, window);