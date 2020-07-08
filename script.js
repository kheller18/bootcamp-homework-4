// selecting elements 
const menu = document.querySelector("#menu");
const start = document.querySelector("#startQuiz");
const quiz = document.querySelector("#quiz");
const question = document.querySelector("#question");
const choiceA = document.querySelector("#A");
const choiceB = document.querySelector("#B");
const choiceC = document.querySelector("#C");
const choiceD = document.querySelector("#D");
const results = document.querySelector("#results");
const submit = document.querySelector("#submit");
const scores = document.querySelector("#scores");
const back = document.querySelector("#back");
const clear = document.querySelector("#clear");
let time = document.querySelector(".time");

let runningQuestion = 0;
var totalSeconds = 0;
var secondsElapsed = 0;
var interval;

// creating questions
let questions = [
    {
        question: "Commonly used data types DO NOT include ____________.",
        choiceA: "1. strings",
        choiceB: "2. booleans",
        choiceC: "3. alerts",
        choiceD: "4. numbers",
        correct: "C"
    },
    {
        question: "The condition in an if / else statement is enclosed within ____________.",
        choiceA: "1. quotes",
        choiceB: "2. curly brackets",
        choiceC: "3. parenthesis",
        choiceD: "4. square brackets",
        correct: "C"
    },
    {
        question: "Arrays in JavaScript can be used to store _____________.",
        choiceA: "1. numbers and strings",
        choiceB: "2. other arrays",
        choiceC: "3. booleans",
        choiceD: "4. all of the above",
        correct: "D"
    },
    {
        question: "String values must be enclosed within _____________ when being assigned to variables.",
        choiceA: "1. commas",
        choiceB: "2. curly brackets",
        choiceC: "3. quotes",
        choiceD: "4. parenthesis",
        correct: "C"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is _____________.",
        choiceA: "1. JavaScript",
        choiceB: "2. terminal / bash",
        choiceC: "3. for loops",
        choiceD: "4. console.log",
        correct: "D"
    },
    
]

let timeleft = 60;
let timer = setInterval(function() {
    if (timeleft < 0) {
        clearInterval(timer);
        endResults();
    } else {
        document.querySelector(".time").innerHTML = "Time: " + timeleft;
    }
    timeleft -= 1;
}, 1000);

function stopTimer() {
    clearInterval(timer);
}

function renderQuestion() {
    let q = questions[runningQuestion];
    question.innerHTML = q.question;
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

function startQuiz() {
    menu.style.display = "none";
    setInterval(timer)
    renderQuestion();
    quiz.style.display = "block";
}

function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        
    }
    if (runningQuestion < questions.length -1) {
        runningQuestion++;
    } else {
        stopTimer();
        quiz.style.display = "none";
        results.style.display = "block";
        
    }
}

function endResults() {
    results.style.display = "block";
    menu.style.display = "none";
    quiz.style.display = "none";
    scores.style.display = "none";
}

function submitResults() {
    results.style.display = "none";
    menu.style.display = "none";
    quiz.style.display = "none";
    scores.style.display = "block";
}

function goBack() {
    scores.style.display = "none";
    menu.style.display = "block";
}

function clearHighscores() {

}



start.addEventListener("click", startQuiz);
choiceA.addEventListener("click", renderQuestion);
choiceB.addEventListener("click", renderQuestion);
choiceC.addEventListener("click", renderQuestion);
choiceD.addEventListener("click", renderQuestion);
submit.addEventListener("click", submitResults);
back.addEventListener("click", goBack);
clear.addEventListener("click", clearHighscores);
