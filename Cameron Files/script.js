const startButton1 = document.getElementById('start-Q1-btn')
const startButton2 = document.getElementById('start-Q2-btn')
const startButton3 = document.getElementById('start-Q3-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
startButton1.addEventListener('click', startQuiz1)
startButton2.addEventListener('click', startQuiz2)
startButton3.addEventListener('click', startQuiz3)
nextButton.addEventListener('click', () => {    
    currentQuestionIndex++
    setNextQuestion()
})
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let shuffledQuestions, currentQuestionIndex

const menuButton = document.getElementById('menu-btn');

menuButton.addEventListener('click', () => {
    questionContainerElement.classList.add('hide');

    startButton1.classList.remove('hide');
    startButton2.classList.remove('hide');
    startButton3.classList.remove('hide');

    menuButton.classList.add('hide');

    clearStatusClass(document.body);
});

function startQuiz3() {
    startButton3.classList.add('hide');
    shuffledQuestions = Q3_questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    startButton1.classList.add('hide');
    startButton2.classList.add('hide');

    setNextQuestion();
}

function startQuiz2() {
    startButton2.classList.add('hide');
    shuffledQuestions = Q2_questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    startButton1.classList.add('hide');
    startButton3.classList.add('hide');

    setNextQuestion();
}

function startQuiz1() {
    startButton1.classList.add('hide');
    shuffledQuestions = Q1_questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    startButton2.classList.add('hide');
    startButton3.classList.add('hide');

    setNextQuestion();
}

function startQuiz1() {
    startButton1.classList.add('hide');
    shuffledQuestions = Q1_questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    startButton2.classList.add('hide');
    startButton3.classList.add('hide');

    setNextQuestion();
}

function setNextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    resetState();
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
        button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    setStatusClass(document.body, correct);

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        menuButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const Q1_questions = [
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Go", correct: false },
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
            { text: "Fe", correct: false }
        ]     
    },
    {
        question: "What is the atomic number of oxygen?",
        answers: [
            { text: "6", correct: false },
            { text: "8", correct: true },
            { text: "10", correct: false },
            { text: "12", correct: false }
        ]
    }
];

const Q2_questions = [
    {
        question: "Your second quiz question?",
        answers: [
            { text: "Answer A", correct: false },
            { text: "Answer B", correct: true },
            { text: "Answer C", correct: false },
            { text: "Answer D", correct: false }
        ]
    }
];

const Q3_questions = [
    {
        question: "Your third quiz question?",
        answers: [
            { text: "Answer A", correct: true },
            { text: "Answer B", correct: false },
            { text: "Answer C", correct: false },
            { text: "Answer D", correct: false }
        ]
    }
];