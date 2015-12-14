$(function(){
	var keywords = ['var', 'function', 'new', 'prototype'];
	
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

	$('.note').prepend('<div class="titleBar"><i class="fa fa-file-text"></i><span>Note</span></div>');

	$('code').prepend('<div class="titleBar"><i class="fa fa-code"></i><span>Let the code speak</span></div>');
})