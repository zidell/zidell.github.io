(function(){
	// https://github.com/medialize/browser-sass/issues/2
	// by https://github.com/bassjobsen
	function read(url) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
	        if((xmlhttp.status == 0 || xmlhttp.status == 200) && xmlhttp.readyState == 4){
		        //basename = url.replace(/^.*\/|\.[^.]*$/g, '');
		        basename = url.substring(url.lastIndexOf('/')+1);
		        scssCode = xmlhttp.responseText;
		        Sass.writeFile(basename, scssCode);
		        compile('@import "' + basename + '"; ');
		    }
		}
		xmlhttp.open("GET",url,true);
		xmlhttp.send();    
	}    

	function registerStylesheets() {
        var links = document.getElementsByTagName('link');
        sheets = [];
        for (var i = 0; i < links.length; i++) {
            if (links[i].rel === 'stylesheet/scss') {
                sheets.push(links[i].href);
            }
        }
        return sheets;
	};

	var sheets =  registerStylesheets();

	for (var i = 0; i < sheets.length; i++) { 
		read(sheets[i]);
	} 
	function compile(scss) {
		// http://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
		// by http://stackoverflow.com/users/48015/christoph
		// by http://stackoverflow.com/users/94668/tomfuertes
		var css = Sass.compile(scss),
		    head = document.head || document.getElementsByTagName('head')[0],
		    style = document.createElement('style');

		style.type = 'text/css';
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
	}
})();