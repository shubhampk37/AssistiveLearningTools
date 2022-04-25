var images = {
    "Happy2"  : "Happy2.jpg",
    "Angry1" : "Angry1.jpg",
    "Happy7" : "Happy7.jpg",
    "Angry20"   : "Angry20.jpg",
    "Angry4" : "Angry4.png",
    "Happy12" : "Happy12.jpg",
    "Angry16"  : "Angry16.jpg",
    "Angry1" : "Angry1.jpg",
    "Happy18" : "Happy18.jpg",
    
    }  
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
    element.innerHTML = images[choices[i]]? '<img src="images/'+images[choices[i]]+'">':choices[i];
    guess("btn" + i, choices[i]);
    }
    
    showProgress();
    }
    };
    
    function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
    quiz.guess(guess);
    populate();
    }
    };
    
    function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
    };
    
    function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML += gameOverHTML;
    };
    
    // create questions
    var questions = [
    new Question("Which one is Angry?", ["Happy2", "Happy12", "Angry1", "Happy2"],"Angry1"),
    new Question("Which one is Happy?", ["Angry1", "Angry4", "Angry16", "Happy2"], "Happy2"),
    // new Question("choose parrot pls?", ["hen", "parrot", "goat",  "dog"], "parrot"),
    //new Question("Find cat below?", ["parrot", "goat", "cat", "tiger"], "cat"),
    new Question("Which one is Angry?", ["Happy2", "Angry4", "Happy12", "Angry1"], "Angry1"),
    new Question("Which one is Happy?", ["Angry1", "Angry4", "Angry16", "Happy2"], "Happy2"),
    new Question("Which one is Happy?", ["Angry4", "Angry20", "Angry16", "Happy2"], "Happy2"),
    //new Question("choose lion pls?", ["lion", "goat", "tiger", "dog"], "lion")
    ];
    
    function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    }
    
    Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
    }
    
    
    function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
    }
    
    Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
    }
    
    Quiz.prototype.guess = function(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
    }
    
    this.questionIndex++;
    }
    
    Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
    }
    
    // create quiz
    var quiz = new Quiz(questions);
    
    // display quiz
    populate();