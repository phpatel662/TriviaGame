$(document).ready(function() {
	// console.log( "ready!" );

	// track which question we are on
	var questionCounter = 0;
	// initial time of 15 seconds for each question
	var time = 15;
	// will keep tally of right guesses for end game
	var correctGuesses = 0;
	//will keep tally of wrong guesses for end game
	var incorrectGuesses = 0;

	// question & answer array
	var questions = [
		{
		question: "Who dates Richard?",
		choices: ["Rachel", "Ross", "Phoebe", "Monica"],
		correctAnswer: "Monica",
	}, 
	{
		question: "What does Joey Do for a living?",
		choices: ["Dentist", "Cashier", "Cook", "Actor"],
		correctAnswer: "Actor",
	}, 
	{
		question: "What role does Joey play in his Soap Opera?",
		choices: ["A doctor", "A nurse", "A lawyer", "A web developer"],
		correctAnswer: "A doctor",
	}, 
	{
		question: "What is the name of the song Phoebe created?",
		choices: ["Smelly cat", "Bye Bye Bye", "Hairy cat", "Catlol"],
		correctAnswer: "Smelly cat",
	}, 
	{
		question: "Where did Rachel and Ross get married?",
		choices: ["Philadelphia", "Africa", "Vegas", "Mexico"],
		correctAnswer: "Vegas",
	},
	{
		question: "What animal did Ross get?",
		choices: ["Dog", "Monkey", "Cat", "Hamster"],
		correctAnswer: "Monkey",
	},
	{
		question: "Who is Ursula?",
		choices: ["Ursula is Phoebe's twin", "She use to date Ross", "She is related to Rachel", "She is the mailman"],
		correctAnswer: "Ursula is Phoebe's twin",
	},
	{
		question: "Who is Ross related to?",
		choices: ["Rachel", "Monica", "Ursula", "Phoebe"],
		correctAnswer: "Monica",
	},
	{
		question: "Who did Rachel leave at the alter?",
		choices: ["David", "Micheal", "Barry", "Gunther"],
		correctAnswer: "Barry",
	},
	{
		question: "What is Rachel's Daughter's name",
		choices: ["Emma", "Emily", "Eda", "Donna"],
		correctAnswer: "Emma",
	},
	{
		question: "Where did Rachel almost move to?",
		choices: ["Germany", "London", "Africa", "France"],
		correctAnswer: "France",
	},
	{
		question: "How many seasons did Friends Last?",
		choices: ["One", "Eight", "Ten", "Five"],
		correctAnswer: "Ten",
	},
	{
		question: "Where did David move to?",
		choices: ["Minsk", "Paris", "Greece", "Pakistan"],
		correctAnswer: "Minsk",
	},
	{
		question: "What is the name of Ross's son?",
		choices: ["Dave", "Bob", "Ben", "Chris"],
		correctAnswer: "Ben",

	}];
	

// create question contents according to question count
function questionContent() {
	// a for loop would be cool here...
		$("#gameScreen").append("<p><strong>" + 
			questions[questionCounter].question + 
			"</p><p class='choices'>" + 
			questions[questionCounter].choices[0] + 
			"</p><p class='choices'>" + 
			questions[questionCounter].choices[1] + 
			"</p><p class='choices'>" + 
			questions[questionCounter].choices[2] + 
			"</p><p class='choices'>" + 
			questions[questionCounter].choices[3] + 
			"</strong></p>");
}

// user guessed correctly
function userWin() {
	$("#gameScreen").html("<p>You got it right!</p>");
	correctGuesses++;
	var correctAnswer = questions[questionCounter].correctAnswer;
	$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
		correctAnswer + 
		"</span></p>")
	setTimeout(nextQuestion, 4000);
	questionCounter++;
}

// user guessed incorrectly
function userLoss() {
	$("#gameScreen").html("<p>Nope, that's not it!</p>");
	incorrectGuesses++;
	var correctAnswer = questions[questionCounter].correctAnswer;
	$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
		correctAnswer + 
		"</span></p>")
	setTimeout(nextQuestion, 4000);
	questionCounter++;
}

// user ran out of time
function userTimeout() {
	if (time === 0) {
		$("#gameScreen").html("<p>You ran out of time!</p>");
		incorrectGuesses++;
		var correctAnswer = questions[questionCounter].correctAnswer;
		$("#gameScreen").append("<p>The answer was <span class='answer'>" + 
			correctAnswer + 
			"</span></p>")
		setTimeout(nextQuestion, 4000);
		questionCounter++;
	}
}

// screen that shows final score and nice message :)
function resultsScreen() {
	if (correctGuesses === questions.length) {
		var endMessage = "Perfect";
		var bottomText = "Good Job!";
	}
	else if (correctGuesses > incorrectGuesses) {
		var endMessage = "Good work! But do better you can...";
		var bottomText = "idk why";
	}
	else {
		var endMessage = "You suck";
		var bottomText = "bye Felicia";
	}
	$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + 
		correctGuesses + "</strong> right.</p>" + 
		"<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
	$("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
	$("#bottomText").html(bottomText);
	gameReset();
	$("#start").click(nextQuestion);
}

// game clock currently set to 15 seconds
function timer() {
	clock = setInterval(countDown, 1000);
	function countDown() {
		if (time < 1) {
			clearInterval(clock);
			userTimeout();
		}
		if (time > 0) {
			time--;
		}
		$("#timer").html("<strong>" + time + "</strong>");
	}
}

// moves question counter forward to show next question
function nextQuestion() {
	if (questionCounter < questions.length) {
		time = 15;
		$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
		questionContent();
		timer();
		userTimeout();
	}
	else {
		resultsScreen();
	}
// console.log(questionCounter);
// console.log(questions[questionCounter].correctAnswer);
}

// reset score and counter parameters on restart
function gameReset() {
	questionCounter = 0;
	correctGuesses = 0;
	incorrectGuesses = 0;
}

	function startGame() {
		$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
		$("#start").hide();
		// $("#gameScreen").append("<div id='question'>");
		// var nextQuestion = questionContent(questionCounter);
		// $("#gameScreen").append(nextQuestion);

	// $("#gameScreen").append("<p>" + questions[questionCounter].question + "</p><p>" + questions[questionCounter].choices[0] + "</p><p>" + questions[questionCounter].choices[1] + "</p><p>" + questions[questionCounter].choices[2] + "</p><p>" + questions[questionCounter].choices[3] + "</p>");
	// questionCounter++;
	questionContent();
		timer();
		userTimeout();
	}

	// this starts the game
	$("#start").click(nextQuestion);

	// click function to trigger right or wrong screen
$("#gameScreen").on("click", ".choices", (function() {
	// alert("clicked!");
	var userGuess = $(this).text();
	if (userGuess === questions[questionCounter].correctAnswer) {
		clearInterval(clock);
		userWin();
	}
	else {
		clearInterval(clock);
		userLoss();
	}
}));
});