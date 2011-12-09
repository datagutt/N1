if(N1 && N1.isHostMethod && N1.isHostMethod(N1, 'extend')){
		N1.extend({ajax:{
		ArrayToURL: function(array) {
  			var pairs = [];
  			for (var key in array){
    			if (array.hasOwnProperty(key)){
      				pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(array[key]));
				}
			}
			return pairs.join('&');
		},
		XHR: function(){
			var obj;
			if(window.XMLHttpRequest){
				obj = new XMLHttpRequest();
			}else if(window.ActiveXObject){
				try{
					obj = new ActiveXObject("Msxml2.XMLHTTP");
				}catch(e){
					try{
						obj = new ActiveXObject("Microsoft.XMLHTTP");
					}catch(e){}
				}
			}
			return obj;
		},
		get: function(url, callback){
			var req = this.XHR();
			req.open('GET', url);
  			req.onreadystatechange = function(){
  				if(req.readyState==4){
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
  				if(req.readyState==4){
  					callback(req.responseText, req.status);
  				}
  			};
  			req.send(params);
   			return req;
		}
	}});
}