$(function(){
	var keywords = ['var', 'function', 'new', 'prototype'];
	
	//$('.note, code').addClass('specialBox');

	$('code').each(function(){
		var codeString = $(this).text();
		codeString = codeString.split('');
		
		var count = 0;
		//console.log(codeString);
		for(i in codeString) {						
			if(codeString[i] == '"') {
				count++;
				if(count % 2 == 0) {
					codeString[i] ='"</span>';
				} else {
					codeString[i] = '<span class="string">"';
				}
			}
		}
		
		codeString = codeString.join('');
		
		for (i in keywords) {
			var s = "\\b" + keywords[i] + "\\b";
			var reg = new RegExp(s, "g");
			codeString = codeString.replace(reg, '<span class="keyword">' + keywords[i] + '</span>');
		}
		
		//codeString = wordsArr.join(' ');
		
		$(this).html(codeString);
	});

	//if Note doesn't have a titleBar, add it
	$('.note').each(function(){
		if ($(this).children('.titleBar').length == 0) {
			$('.note').prepend('<div class="titleBar"><i class="fa fa-file-text"></i><span>Note</span></div>');
		}
	});

	//if Code doesn't have a titleBar, add it
	$('code').each(function(){
		if ($(this).children('.titleBar').length == 0) {
			$('code').prepend('<div class="titleBar"><i class="fa fa-code"></i><span>Let the Code Speak</span></div>');
		}
	});
	
	//if Tips doesn't have a titleBar, add it
	$('.tips').each(function(){
		if ($(this).children('.titleBar').length == 0) {
			$('.tips').prepend('<div class="titleBar"><i class="fa fa-lightbulb-o"></i><span>Tips</span></div>');
		}
	});
})