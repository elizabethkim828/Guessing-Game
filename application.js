var winningNumber,
	playersGuess,
	prevguesses = [];

/* **** Guessing Game Functions **** */

// Generate Winning Number
function generateWinningNumber(){
	winningNumber = Math.floor(Math.random()*100+1);
	console.log(winningNumber);
}

// Fetch the Players Guess
function playersGuessSubmission(){
	playersGuess = +$('input').val();
	function appendGuess() {
		$('#history').show();
		$('#history').find('p').append('<li>You guessed ' + playersGuess + '.</li>')
		$('body').animate({scrollTop: document.body.scrollHeight});
	};
	appendGuess();
	
	if (prevguesses.indexOf(playersGuess) === -1) {
		prevguesses.push(playersGuess);
	} else {
		alert('Oops! You already tried that number!')
	}
	$('input').val(null);
}

// Check if the Player's guess is the winning number
function checkGuess(){
	if (playersGuess === winningNumber) {
		$('#status').text('CONGRATS! YOU WON!').show();
		$('#footer').fadeIn();
		$('.congrats').show();
		$('.congrats').on('click', function(){
    	    $('.congrats').hide();
	    });
	} else {
		var prevdistance = Math.abs(prevguesses[prevguesses.length - 2] - winningNumber);
		var currdistance = Math.abs(playersGuess - winningNumber);
		if (prevguesses.length < 2) {
			$('#status').html('Sorry, guess again! ' + remainingGuesses() + '<br><span>' + feedback() +'</span>').show();
		} else if (prevguesses.length < 5) {
			if (currdistance < prevdistance) {
				$('#status').html('Getting warmer! ' + remainingGuesses() + '<br><span>' + feedback() +'</span>').show();
			} else {
				$('#status').html('Getting colder! ' + remainingGuesses() + '<br><span>' + feedback() +'</span>').show();
			}
		} else {
			$('#submitbutton').remove();
			$('#footer').find('p').text('Being a loser sucks. Try again!');
			$('#footer').fadeIn();
			$('#status').html('GAME OVER!<br>The answer was <span>' + winningNumber + '</span>.').show();
		}
	}
}

// Determine number of remaining guesses
function remainingGuesses() {
	this.remainingguesses = 5 - prevguesses.length;
	if (this.remainingguesses === 1) {
		return 'You have 1 more chance.';
	} else {
		return 'You have ' + this.remainingguesses + ' more chances.';
	}
}

// Provide feedback to player:

// Determine if the next guess should be a lower or higher number
function lowerOrHigher(){
	if (playersGuess > winningNumber) {
		return "too high";
	} else {
		return "too low";
	}
}

// Determine absolute value of distance of playersGuess from winningNumber
function distance(){
	var distance = Math.abs(playersGuess - winningNumber);
	if (distance < 5) {
		return " but less than 5 from the winning number.";
	} else if (distance < 10) {
		return " but less than 10 from the winning number."
	} else {
		return " and really far from the winning number.";
	}
}

// Feedback output
function feedback(){
	return "Your guess (" + prevguesses[prevguesses.length - 1] + ") was " + lowerOrHigher() + distance();

}

// Provide hints to help the Player guess

function provideHint() {
	event.preventDefault();
	function prime(n) {
		for (var i = 2; i < n; i++) {
			if (n % i === 0) {
				return false;
			}
		}
		return n > 1;
	}
	
	function appendHint(string) {
		$('#history').show();
		$('#history').find('p').append('<li>'+string+'</li>')
		$('html, body').animate({scrollTop: document.body.scrollHeight}, 'slow');
	}
	
	var r = new remainingGuesses();
	switch(r.remainingguesses) {
		case 5:
			appendHint('Don\'t be lazy! You didn\'t even try!');
			break;
		case 4:
			if (winningNumber > 50) {
				appendHint('The winning number is greater than 50.');
			} else {
				appendHint('The winning number is less than or equal to 50.');
			}
			break;
		case 3:
			if (winningNumber % 2 === 0) {
				appendHint('The winning number is even.');
			} else {
				appendHint('The winning number is odd.');
			}
			break;
		case 2:
			if (prime(winningNumber)) {
				appendHint('The winning number is prime.');
			} else {
				appendHint('The winning number is not prime.');
			}
			break;
		case 1:
			appendHint('The winning number is ' + winningNumber + '!');
			break;
	}
}

// Allow the Player to Play Again
function playAgain(){
	location.reload();
}

// EVENT HANDLERS
$(document).ready(function() {
	generateWinningNumber();
	
	$('#submitbutton').on('click', function() {
		event.preventDefault();
		if ($('input').val() !== "") {
			playersGuessSubmission();
			checkGuess();
		};
	});
	
	$('input').keypress(function(event){
	    if(event.keyCode == 13){
    	    $('#submitbutton').click();
	    }
	});
	
	$('a').on('click', provideHint);
	
	$('.playagain').on('click', playAgain);
	
});