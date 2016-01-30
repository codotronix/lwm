$(function(){

	
	var keywords = ['console', 'function', 'http', 'listen', 'log', 'new', 'prototype', 'require', 'request', 'response', 'var'];
	
	//$('.note, code').addClass('specialBox');

	
	$('code').each(function(){
		if ($(this).hasClass('html')) {
			var htmlCode = $(this).html();
			$(this).html('').text(htmlCode);
			return;
		}


		var codeString = $(this).text();
		
		codeString = codeString.split('');		
		var count = 0;
		//console.log(codeString);
		var allStrings = [];
		var aString = '';
		var stringStart = false;

		// loop to identify String
		for(i in codeString) {
			if(codeString[i] == '"') {
				count++;
				if(count % 2 == 0) {
					codeString[i] ='</span>';
					stringStart = false;
					allStrings.push(aString);
					aString = '';
				} else {
					codeString[i] = '<span class="string">';
					stringStart = true;
				}
			} else if (stringStart) {
				//console.log(aString);
				aString += codeString[i];
				codeString[i] = '';
				//console.log(aString);
			}
		}

		//console.log(allStrings)
		codeString = codeString.join('');

		//identify comments
		codeString = codeString.replace(/\/\*/g, '<span class="comment">/*');
		codeString = codeString.replace(/\*\//g, '*/</span>');
		
		/* (["']).*?\1  */	
	
		for (i in keywords) {
			var s = "\\b" + keywords[i] + "\\b";
			var reg = new RegExp(s, "g");
			codeString = codeString.replace(reg, '<span class="keyword">' + keywords[i] + '</span>');
		}
		
		
		//codeString = wordsArr.join(' ');		
		$(this).html(codeString);


		$(this).find('.string').each(function(index){
			$(this).text('"' + allStrings[index] + '"');
		})
	});
	
	

	//if Note doesn't have a titleBar, add it
	$('.note').each(function(){
		if ($(this).children('.titleBar').length == 0) {
			$(this).prepend('<div class="titleBar"><i class="fa fa-file-text"></i><span>Note</span></div>');
		}
	});

	//if Code doesn't have a titleBar, add it
	$('code').each(function(){
		if ($(this).children('.titleBar').length == 0) {
			$(this).prepend('<div class="titleBar"><i class="fa fa-code"></i><span>Let the Code Speak</span></div>');
		}
	});
	
	//if Tips doesn't have a titleBar, add it
	$('.tips').each(function(){
		if ($(this).children('.titleBar').length == 0) {
			$(this).prepend('<div class="titleBar"><i class="fa fa-lightbulb-o"></i><span>Tips</span></div>');
		}
	});

	//if warning doesn't have a titleBar, add it
	$('.warning').each(function(){
		if ($(this).children('.titleBar').length == 0) {
			$(this).prepend('<div class="titleBar"><i class="fa fa-exclamation-circle"></i><span>Warning</span></div>');
		}
	});
    
    //load sidebar
    function loadSideBar () {
        var sidebarHTML = '';
        
        //the VDOsssss
        for (var i in sidebar.vdo) {
            sidebarHTML +=  '<div class="vdo">'
                        +       '<label class="title">' + sidebar.vdo[i].title + '</label>'
                        +       '<div class="embed-responsive embed-responsive-4by3">'
                        +           '<iframe class="embed-responsive-item " src="' + sidebar.vdo[i].src + '" frameborder="0" allowfullscreen></iframe>'
                        +       '</div>'
                        +   '</div>';
        }
        
        //dump it all to page
        $('.rSideBar').html(sidebarHTML);
    }
    
    loadSideBar();
    
    //load followUs topbar icons
    function loadFollowUs () {
        var followUsHtm = '';
        followUsHtm += '<ul class="followUsIcons">'
                        +     '<li><a href="https://twitter.com/codotronix" class="fa fa-twitter"></a></li>'
                        +     '<li><a href="https://www.facebook.com/codotronix" class="fa fa-facebook"></a></li>'
                        + '</ul>';
        
        $('.blog-title').append(followUsHtm);
    }
    
    loadFollowUs();
})