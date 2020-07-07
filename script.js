// selecting elements 
const menu = document.querySelector("#menu")
const start = document.querySelector("#startQuiz");
const quiz = document.querySelector("#quiz");
const question = document.querySelector("#question");
const choiceA = document.querySelector("#A");
const choiceB = document.querySelector("#B");
const choiceC = document.querySelector("#C");
const choiceD = document.querySelector("#D");

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

const lastQuestion = questions.length -1;
let runningQuestion = 0;


choiceA.addEventListener("click", produceQuestion);
choiceB.addEventListener("click", produceQuestion);
choiceC.addEventListener("click", produceQuestion);
choiceD.addEventListener("click", produceQuestion);

function produceQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = q.question;
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);

function startQuiz() {
    menu.style.display = "none";
    produceQuestion();
    quiz.style.display = "block";
}

function checkAnswer() {
    if(runningQuestion < lastQuestion) {
        runningQuestion++
    }

}


