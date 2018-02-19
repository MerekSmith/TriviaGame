$(document).ready(function () {

	var correctCount = 0;
	var incorrectCount = 0;
	var unawnseredCount = 0;
	var questionTime = 30;
	var revealTime = 5;
	var correctAnswer;
	// difficulty options are easy, medium, and hard.
	var difficulty = "medium";
	// categories are 9 = General Knowledge, 10 = Books, 11 = Film, 12 = Music, 14 = Television, 15 = Video Games, 16 = Board Games, and provide a random option (use Math.random).
	var category = 9;


	// TODO: In intialize function, add buttons to choose categories and difficulty. Store selection in variables which are then passed through to the url once the user hits the "start" button.


	// intervalTime to hold time.
	var intervalTime;
	// the timer will count down from 30 seconds for the user to select an answer.
	function questionTimer() {
		questionTime = 30;
		clearInterval(intervalTime);
		intervalTime = setInterval(countDown, 1000);
	};


	function countDown() {
		questionTime--;
		$('.timer').text('Time Remaining: ' + questionTime + ' Seconds')

		if (questionTime === 0) {
			$('.question').text('Out of Time!');
			$('.answers').empty();
			$('.contents').append('<h3 class="responseAnswer">The Correct Answer was: ' + correctAnswer + '</h3>');
			$('.contents').append('<div class="responseImage"><img src="assets/images/timesup.gif"></div>')
			unawnseredCount++;
			timesUp();
			revealTimer();
		}
	};

	// the timer will count down from 5 seconds to reveal the the answer was correct, incorrect, or the user ran out of time then proceed to the next question.
	function revealTimer() {
		revealTime = 5;
		clearInterval(intervalTime);
		intervalTime = setInterval(revealTimeCountDown, 1000);
	};

	function revealTimeCountDown() {
		revealTime--;
		// $('.timer').text('Time Remaining: ' + revealTime + ' Seconds')
		if (revealTime === 0) {
			timesUp();
			if (correctCount + incorrectCount + unawnseredCount === 8) {
				$('.question').text("All done, here's how you did!");
				$('.answers').empty();
				$('.responseImage').empty();
				$('.responseAnswer').empty();
				$('.contents').append('<h4>Correct Answers: ' + correctCount + '</h4>');
				$('.contents').append('<h4>Incorrect Answers: ' + incorrectCount + '</h4>');
				$('.contents').append('<h4>Unanswered: ' + unawnseredCount + '</h4>');
				$('.contents').append('<button class="reset">Start Over?</button>');
			}
			else {
				newQuestion();
			}
		}
	};


	// TODO: logic to change to correct or wrong answer response.
	function answerResponse() {
		$('.answers').on('click', function () {
			console.log($(this).attr('value'));
			console.log(correctAnswer);
			console.log($(this).attr('value') === correctAnswer);
			// If user selects the correct answer, display "Correct!" and the correct image.
			if ($(this).attr('value') === correctAnswer) {
				correctCount++;
				$('.question').text('Correct!');
				$('.answers').empty();
				// TODO: Display an image for being correct.
				$('.contents').append('<div class="responseImage"><img src="assets/images/correct.gif"></div>')
				revealTimer();
			}
			// If user selects incorrect answer, display "Nope!", what the correct answer was, and the incorrect image.
			else {
				incorrectCount++;
				$('.question').text('Nope!');
				$('.answers').empty();
				$('.contents').append('<h3 class="responseAnswer">The Correct Answer was: ' + correctAnswer + '</h3>');
				$('.contents').append('<div class="responseImage"><img src="assets/images/incorrect.gif"></div>')
				revealTimer();
			}
		});
	}


	function timesUp() {
		clearInterval(intervalTime);
	}


	function newQuestion() {

		// URL for random trivia questions through trivia API. Pulls category and difficulty from user selections and start of the game.
		var triviaURL = "https://opentdb.com/api.php?amount=1&category=" + category + "&type=multiple&difficulty=" + difficulty + "";


		// array shuffle function to randomize list order of available answers.
		Array.prototype.shuffle = function () {
			var input = this;

			for (var i = input.length - 1; i >= 0; i--) {

				var randomIndex = Math.floor(Math.random() * (i + 1));
				var itemAtIndex = input[randomIndex];

				input[randomIndex] = input[i];
				input[i] = itemAtIndex;
			}
			return input;
		}



		// Trivia API to pull random questions.
		$.ajax({
			url: triviaURL,
			method: "GET"
		}).then(function (response) {
			var results = response.results[0];
			console.log(results.category);
			console.log(results.incorrect_answers);
			var category = results.category;
			var question = results.question;
			correctAnswer = results.correct_answer;
			var incorrectAnswers = results.incorrect_answers;
			var answerChoices = [];
			answerChoices.push(correctAnswer);
			answerChoices.push(incorrectAnswers[0]);
			answerChoices.push(incorrectAnswers[1]);
			answerChoices.push(incorrectAnswers[2]);
			console.log('answers', answerChoices);
			answerChoices.shuffle();
			console.log('shuffled answers', answerChoices);
			var newH2 = $('<h2>');
			$('.contents').html('<h3 class="timer">Time Remaining: 30 Seconds</h3>');
			$('.contents').append('<h3 class="question">' + question + '</h3>');
			$('.contents').append('<h2 class="answers" value="' + answerChoices[0] + '">' + answerChoices[0] + '</h2>');
			$('.contents').append('<h2 class="answers" value="' + answerChoices[1] + '">' + answerChoices[1] + '</h2>');
			$('.contents').append('<h2 class="answers" value="' + answerChoices[2] + '">' + answerChoices[2] + '</h2>');
			$('.contents').append('<h2 class="answers" value="' + answerChoices[3] + '">' + answerChoices[3] + '</h2>');
			questionTimer();
			answerResponse();


		});
	};
	newQuestion();

	///////// End of document ready function ///////////
});