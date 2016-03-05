var answer = Math.floor(Math.random()*100+1);

$(document).ready(function() {
	$('#submitbutton').on('click', function() {
		if (+$('input').val() === answer) {
			$(this).remove();
			$('a').after('<p style="color: red">CONGRATS! YOU ARE CORRECT!</p>');
			$('#footer').fadeIn();
		} else {
			$(this).text('Try Again!');
		}
	});
	
	$('input').on('focus', function() {
			$('#submitbutton').text('Submit');
	});
	
	$('a').on('click', function() {	
		alert('Try the number '+answer);
	});
	
	$('#playagain').on('click', function() {
		location.reload();
	});	
});