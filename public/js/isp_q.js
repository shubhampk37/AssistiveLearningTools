var images = {
  circle1: "circle1.jpg",
  circle2: "circle2.jpg",
  diamond1: "diamond1.jpg",
  diamond2: "diamond2.jpg",
  rectangle1: "rectangle1.jpg",
  rectangle2: "rectangle2.png",
  star1: "star1.jpg",
  star2: "star2.jpg",
  purple1: "purple1.jpg",
  purple2: "purple 2.jpg",
  red1: "red1.jpg",
  red2: "red2.jpg",
  yellow1: "yellow1.jpg",
  yellow2: "yellow2.jpg",
  green1: "green1.jpg",
  green2: "green2.jpg",
  oval1: "oval1.jpg",
  oval2: "oval2.jpg",
};
function populate() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    // show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;

    // show options
    var choices = quiz.getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = images[choices[i]]
        ? '<img src="/Images/' + images[choices[i]] + '">'
        : choices[i];
      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
}

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    populate();
  };
}

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML =
    "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML += gameOverHTML;
}

// create questions
var questions = [
  new Question(
    "Which one is a Star?",
    ["rectangle1", "circle2", "oval1", "star1"],
    "star1"
  ),
  new Question(
    "Which one is an Oval?",
    ["oval2", "rectangle1", "circle1", "star2"],
    "oval2"
  ),
  // new Question("choose parrot pls?", ["hen", "parrot", "goat",  "dog"], "parrot"),
  //new Question("Find cat below?", ["parrot", "goat", "cat", "tiger"], "cat"),
  new Question(
    "Which one is red?",
    ["green1", "purple2", "yellow1", "red1"],
    "red1"
  ),
  new Question(
    "Which one is green?",
    ["red2", "yellow2", "green2", "purple1"],
    "green2"
  ),
  new Question(
    "Which one is purple?",
    ["red1", "purple1", "green2", "yellow1"],
    "purple1"
  ),
  //new Question("choose lion pls?", ["lion", "goat", "tiger", "dog"], "lion")
];

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.guess = function (answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  }

  this.questionIndex++;
};

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
};

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
