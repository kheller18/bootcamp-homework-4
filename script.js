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

// Application gets kicked off here
displayMenu();

function checkAnswer(answer) {
    if (answer != questions[runningQuestion].correct) {
        console.log("incorrect");
        if (timeleft < 10) {
            timeleft = 0;
        } else {
            timeleft -= 10;
        }
        document.querySelector("#time").innerHTML = "Time: " + timeleft;
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

function startQuiz() {
    menu.style.display = "none";
    timeleft = 75;
    startTimer();
    renderQuestion();
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
    displayMenu();
}

function clearHighscores() {
    localStorage.removeItem("users");
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
    let array = []; 
    array = submitResults();
    console.log(array);

    scores.style.display = "block";
    menu.style.display = "none";
    quiz.style.display = "none";
    results.style.display = "none";
}



function goBack() {
    scoreList = document.querySelector("#scoreList");
    removeAllChildNodes(scoreList);
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
    document.querySelector("#time").innerHTML = "Time: 75";
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
