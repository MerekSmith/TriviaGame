$(document).ready(function () {

	var correctCount = 0;
	var incorrectCount = 0;
	var unawnseredCount = 0;
	var questionTime = 30;
	var revealTime = 5;
	var correctAnswer;
	var usedQuestions = [];
	// difficulty options are easy, medium, and hard.
	var difficulty;
	var difficultyChosen = false;
	// categories are 9 = General Knowledge, 10 = Books, 11 = Film, 12 = Music, 14 = Television, 15 = Video Games, 16 = Board Games, and provide a random option (use Math.random).
	var category;
	var categoryChosen = false;


	// TODO: In intialize function, add buttons to choose categories and difficulty. Store selection in variables which are then passed through to the url once the user hits the "start" button.
	function intializeGame() {
		correctCount = 0;
		incorrectCount = 0;
		unawnseredCount = 0;
		$('.contents').html('<h3>Choose a Difficulty:</h3>');
		// Difficulty Buttons
		$('.contents').append('<div class="difficultyChoices"></div>');
		$('.difficultyChoices').html('<button class="difficultyButtons" difficulty="">Random</button>');
		$('.difficultyChoices').append('<button class="difficultyButtons" difficulty="&difficulty=easy">Easy</button>');
		$('.difficultyChoices').append('<button class="difficultyButtons" difficulty="&difficulty=medium">Medium</button>');
		$('.difficultyChoices').append('<button class="difficultyButtons" difficulty="&difficulty=hard">Hard</button>');
		// Category Buttons
		$('.contents').append('<h3>Choose a Category:</h3>');
		$('.contents').append('<div class="categoryChoices"></div>');
		$('.categoryChoices').html('<button class="categoryButtons" category="">Random</button>');
		$('.categoryChoices').append('<button class="categoryButtons" category="&category=9">General Knowledge</button>');
		$('.categoryChoices').append('<button class="categoryButtons" category="&category=10">Books</button>');
		$('.categoryChoices').append('<button class="categoryButtons" category="&category=11">Film</button>');
		$('.categoryChoices').append('<button class="categoryButtons" category="&category=12">Music</button>');
		$('.categoryChoices').append('<button class="categoryButtons" category="&category=14">Television</button>');
		$('.categoryChoices').append('<button class="categoryButtons" category="&category=15">Video Games</button>');
		$('.categoryChoices').append('<button class="categoryButtons" category="&category=16">Board Games</button>');
		$('.contents').append('<br><div class="startButtonDiv"><button class="startGameButton">Start Game!</button></div>');
		$('.startButtonDiv').append('<div class="startErrorDisplay"></div>');

		intializeDifficultyChoices();
		intializeCategoryChoices();
		buttonEffects()
		startGame();
	};

	function buttonEffects() {
		$('.difficultyButtons').on('click', function () {
			$('.difficultyButtons').css({ "background-color": "", "border": "" });
			$(this).css({ "background-color": "#5e8ce0", "border": "solid 1px black" });
		});
		$('.categoryButtons').on('click', function () {
			$('.categoryButtons').css({ "background-color": "", "border": "" });
			$(this).css({ "background-color": "#5e8ce0", "border": "solid 1px black" });
		});

	}

	function intializeDifficultyChoices() {
		$('.difficultyButtons').on('click', function () {
			difficulty = $(this).attr('difficulty');
			difficultyChosen = true;
		});
	};

	function intializeCategoryChoices() {
		$('.categoryButtons').on('click', function () {
			category = $(this).attr('category');
			categoryChosen = true;
		});
	};

	function restart() {
		$('.restart').on('click', function () {
			intializeGame();
		})
	};

	function startGame() {
		$('.startGameButton').on('click', function () {
			if ((difficultyChosen === true) && (categoryChosen === true)) {
				newQuestion();
			}
			else {
				$('.startErrorDisplay').html('<h4>Please choose a difficulty and category!</h4>');
			}
		});
	};


	// populates a question using a trivia API. Also takes answers and shuffles them into a random order. Then it starts a timer for the user to select an answer.
	function newQuestion() {

		// URL for random trivia questions through trivia API. Pulls category and difficulty from user selections and start of the game.
		var triviaURL = "https://opentdb.com/api.php?amount=1&type=multiple" + category + difficulty;

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
			var question = results.question;
			if (usedQuestions.includes(question)) {
				console.log('if', usedQuestions);
				newQuestion();
			}
			else {
				console.log('else', usedQuestions);
				usedQuestions.push(question);
				var categoryName = results.category;
				var difficultyName = results.difficulty;
				correctAnswer = results.correct_answer;
				var incorrectAnswers = results.incorrect_answers;
				var answerChoices = [];
				answerChoices.push(correctAnswer);
				answerChoices.push(incorrectAnswers[0]);
				answerChoices.push(incorrectAnswers[1]);
				answerChoices.push(incorrectAnswers[2]);
				answerChoices.shuffle();

				// Displays question and answer choices.
				$('.contents').empty();
				$('.contents').html('<h3 class="timer">Time Remaining: 30 Seconds</h3>');
				$('.contents').append('<h4 class="category">Category: ' + categoryName + '</h4>')
				$('.contents').append('<h4 class="difficulty">Difficulty: ' + difficultyName + '</h4>')
				$('.contents').append('<h3 class="question">' + question + '</h3>');
				$('.contents').append('<h2 class="answers" value="' + answerChoices[0] + '">' + answerChoices[0] + '</h2>');
				$('.contents').append('<h2 class="answers" value="' + answerChoices[1] + '">' + answerChoices[1] + '</h2>');
				$('.contents').append('<h2 class="answers" value="' + answerChoices[2] + '">' + answerChoices[2] + '</h2>');
				$('.contents').append('<h2 class="answers" value="' + answerChoices[3] + '">' + answerChoices[3] + '</h2>');
				questionTimer();
				answerResponse();
			}
		});
	};


	// logic to change to correct or wrong answer response.
	function answerResponse() {
		$('.answers').on('click', function () {
			// TODO: figure out logic to compare answers when a special character is involved. Saved answer looks normal but answer from API system pushed into Array includes the code for the special characters instead.
			console.log($(this).attr('value'));
			console.log(correctAnswer);
			console.log($(this).attr('value') === correctAnswer);
			// If user selects the correct answer, display "Correct!" and the correct image.
			if ($(this).attr('value') === correctAnswer) {
				correctCount++;
				$('.question').text('Correct!');
				$('.category').empty();
				$('.difficulty').empty();
				$('.answers').empty();
				$('.contents').append('<div class="imageDiv"><img class="responseImage" src="assets/images/correct.gif"></div>')
				revealTimer();
			}
			// If user selects incorrect answer, display "Nope!", what the correct answer was, and the incorrect image.
			else {
				incorrectCount++;
				$('.question').text('Nope!');
				$('.category').empty();
				$('.difficulty').empty();
				$('.answers').empty();
				$('.contents').append('<h3 class="responseAnswer">The Correct Answer was: ' + correctAnswer + '</h3>');
				$('.contents').append('<div class="imageDiv"><img class="responseImage" src="assets/images/incorrect.gif"></div>')
				revealTimer();
			}
		});
	}


	// intervalTime to hold time.
	var intervalTime;
	// the timer will count down from 30 seconds for the user to select an answer.
	function questionTimer() {
		questionTime = 30;
		clearInterval(intervalTime);
		intervalTime = setInterval(countDown, 1000);
	};


	// Quester timer that will display time's up message and correct answer when timer is at 0.
	function countDown() {
		questionTime--;
		$('.timer').text('Time Remaining: ' + questionTime + ' Seconds')

		if (questionTime === 0) {
			$('.question').text('Out of Time!');
			$('.category').empty();
			$('difficultyy').empty();
			$('.answers').empty();
			$('.contents').append('<h3 class="responseAnswer">The Correct Answer was: ' + correctAnswer + '</h3>');
			$('.contents').append('<div class="imageDiv"><img class="responseImage" src="assets/images/timesup.gif"></div>')
			unawnseredCount++;
			timesUp();
			revealTimer();
		}
	};


	// the timer will count down from 5 seconds to reveal the the answer was correct, incorrect, or the user ran out of time then proceed to the next question.
	function revealTimer() {
		revealTime = 4;
		clearInterval(intervalTime);
		intervalTime = setInterval(revealTimeCountDown, 1000);
	};


	function timesUp() {
		clearInterval(intervalTime);
	}


	function revealTimeCountDown() {
		revealTime--;
		if (revealTime === 0) {
			timesUp();
			if (correctCount + incorrectCount + unawnseredCount === 8) {
				$('.question').text("All done, here's how you did!");
				$('.category').empty();
				$('.difficulty').empty();
				$('.answers').empty();
				$('.imageDiv').empty();
				$('.responseAnswer').empty();
				$('.contents').append('<h4>Correct Answers: ' + correctCount + '</h4>');
				$('.contents').append('<h4>Incorrect Answers: ' + incorrectCount + '</h4>');
				$('.contents').append('<h4>Unanswered: ' + unawnseredCount + '</h4>');
				$('.contents').append('<button class="restart">Start Over?</button>');
				restart();
			}
			else {
				newQuestion();
			}
		}
	};








	intializeGame();

	///////// End of document ready function ///////////
});
