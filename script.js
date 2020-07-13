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
const finalScore = document.querySelector("#finalScore");
const highScores = document.querySelector("#highScores")
let time = document.querySelector("#time");
let initials = document.querySelector("#initials");
let scoreList = document.querySelector("#scoreList");
let answerFeedback = document.querySelector("#answerFeedback");
//var individualList = document.querySelector("#individualList");
let users = [];
let getUsers = [];
let counter = 0;
let initialsArray = [];
let timeArray = [];
let runningQuestion = 0;
var totalSeconds = 0;
var secondsElapsed = 0;
let timeleft = 75;
var timer;
let scoreCounter = 1;
let bold = "DO NOT";

// creating questions
let questions = [
    {
        question: "Commonly used data types " + bold.bold("DO NOT") + " include ________.",
        choiceA: "A. strings",
        choiceB: "B. booleans",
        choiceC: "C. alerts",
        choiceD: "D. numbers",
        correct: "C"
    },
    {
        question: "The condition in an if / else statement is enclosed within ________.",
        choiceA: "A. quotes",
        choiceB: "B. curly brackets",
        choiceC: "C. parenthesis",
        choiceD: "D. square brackets",
        correct: "C"
    },
    {
        question: "Arrays in JavaScript can be used to store ________.",
        choiceA: "A. numbers and strings",
        choiceB: "B. other arrays",
        choiceC: "C. booleans",
        choiceD: "D. all of the above",
        correct: "D"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        choiceA: "A. commas",
        choiceB: "B. curly brackets",
        choiceC: "C. quotes",
        choiceD: "D. parenthesis",
        correct: "C"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is ________.",
        choiceA: "A. JavaScript",
        choiceB: "B. terminal / bash",
        choiceC: "C. for loops",
        choiceD: "D. console.log",
        correct: "D"
    },
    
]

// Application gets kicked off here
displayMenu();

function checkAnswer(answer) {
    if (answer != questions[runningQuestion].correct) {
        console.log("incorrect");
        //renderProgress();
        //document.querySelector("#answerFeedback").innerHTML = "Wrong!";
        if (timeleft < 10) {
            timeleft = 0;
            stopTimer();
        } else {
            timeleft -= 10;
        }
        document.querySelector("#time").innerHTML = "Time: " + timeleft;
    } else {
        //answerFeedback.textContent = "Correct!";
        //renderProgress();
        //document.querySelector("#answerFeedback").innerHTML = "Correct!";
    } 

    if (runningQuestion < questions.length -1) {
        runningQuestion++;
    } else {
        stopTimer();
        endResults();
        document.querySelector("#finalScore").innerHTML = "Your final score is: " + timeleft;
        quiz.style.display = "none";
        results.style.display = "block";
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function stopTimer() {
    clearInterval(timer);
}

function renderTime() {
    
    document.querySelector("#time").innerHTML = "Time: " + timeleft;
}

function startTimer() {
    timer = setInterval(function() {    
        timeleft -= 1;
        if (timeleft <= 0) {
            stopTimer();
            endResults();
        }    
        renderTime();
    }, 1000);
}    

function renderQuestion() {
    let q = questions[runningQuestion];
    question.innerHTML = q.question;
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

function renderProgress() {
    //let addFeedback = document.createElement("<div>");
    removeAllChildNodes(answerFeedback);
    for (let qIndex = 0; qIndex < questions.length; qIndex++) {
        answerFeedback.innerHTML += "<div class='totalFeedback' id="+ qIndex +"></div";

        
    } 
    console.log(answerFeedback);
    //totalFeedback = document.querySelector(".totalFeedback");
    //totalFeedback.setAttribute("style", "display: inline-block;");
}

function startQuiz() {
    menu.style.display = "none";
    timeleft = 75;
    startTimer();
    renderQuestion();
    renderProgress();
    quiz.style.display = "block";
}

function endResults() {
    document.querySelector("#finalScore").innerHTML = "Your final score is: " + timeleft;
    results.style.display = "block";
    menu.style.display = "none";
    quiz.style.display = "none";
    scores.style.display = "none";
}

function goBack() {
    //scoreList = document.querySelector("#scoreList");
    //removeAllChildNodes(scoreList);
    scores.style.display = "none";
    answerFeedback = document.querySelector("#answerFeedback");
    removeAllChildNodes(answerFeedback);
    displayMenu();
}

function clearHighscores() {
    localStorage.removeItem("users");
    answerFeedback = document.querySelector("#answerFeedback");
    removeAllChildNodes(answerFeedback);
    //scoreList = document.querySelector("#scoreList");
    //removeAllChildNodes(scoreList);
}

function submitResults() {
    //event.preventDefault();
    scoreList = document.querySelector("#scoreList");
    removeAllChildNodes(scoreList);
    results.style.display = "none";
    menu.style.display = "none";
    quiz.style.display = "none";
    scores.style.display = "block";
    users = [];
    getUsers = [];
    
    if (JSON.parse(localStorage.getItem("users")) != null) {
        users = JSON.parse(localStorage.getItem("users"));
        console.log(users)
    } 
    
    users.push({"initials": initials.value.trim(), "score": timeleft});
    window.localStorage.setItem("users", JSON.stringify(users));
    getUsers = JSON.parse(localStorage.getItem("users"));
    console.log(users)
    console.log(getUsers)

    for (let i = 0; i < getUsers.length; i++) {
        var li = document.createElement('li');
        if (i % 2 == 0) {
            li.setAttribute("style", "background-color: #cc99ff;");
        } else {
            li.setAttribute("style", "background-color: #8484D8;");
          
        }
        li.textContent = (i+1) + ". " + getUsers[i].initials + " - " + getUsers[i].score;
        scoreList.appendChild(li); 
    }
    return scoreList;
}

function displayHighscores() {
    stopTimer();
    scores.style.display = "block";
    menu.style.display = "none";
    quiz.style.display = "none";
    results.style.display = "none";
}



function goBack() {
    scoreList = document.querySelector("#scoreList");
    //removeAllChildNodes(scoreList);
    scores.style.display = "none";
    displayMenu();
}

function clearHighscores() {
    localStorage.removeItem("users");
    scoreList = document.querySelector("#scoreList");
    removeAllChildNodes(scoreList);
}


function displayMenu() {
    clearInterval(timer);
    document.querySelector("#time").innerHTML = "Time: 0";
    menu.style.display = "block";
    runningQuestion = 0;
}

start.addEventListener("click", startQuiz);
choiceA.addEventListener("click", renderQuestion);
choiceB.addEventListener("click", renderQuestion);
choiceC.addEventListener("click", renderQuestion);
choiceD.addEventListener("click", renderQuestion);
submit.addEventListener("click", submitResults);
back.addEventListener("click", goBack);
clear.addEventListener("click", clearHighscores);
highScores.addEventListener("click", displayHighscores);
