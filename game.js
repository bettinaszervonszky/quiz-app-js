const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Kit szeret Bíbor a legjobban a világon?',
        choice1: 'Lujzika',
        choice2: 'Bettina Szervonszky',
        choice3: 'Luca',
        choice4: 'Szűcs Petra',
        answer: 2,
    },
    {
        question:
            "Kedvenc tantárgya a Semmelweis Elit Kutatóegyetemen?",
        choice1: "Anatómia",
        choice2: "Latin",
        choice3: "Pszichológia",
        choice4: "None of the above",
        answer: 4,
    },
    {
        question: "Kedvenc étele?",
        choice1: "Zab",
        choice2: "Húzsleves",
        choice3: "Hortobágyi húsospalacsinta",
        choice4: "Tiramisu",
        answer: 3,
    },
    {
        question: "Hány hónapozs?",
        choice1: "5",
        choice2: "4",
        choice3: "3",
        choice4: "2",
        answer: 1,
    },
    {
        question: "Kedvenc évszaka?",
        choice1: "Tél",
        choice2: "Nyár",
        choice3: "Tavasz",
        choice4: "Ősz",
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()