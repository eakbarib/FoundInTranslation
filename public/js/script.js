const nextButton = document.getElementById('next-btn')
const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  if (currentQuestionIndex < shuffledQuestions.length) {
    setNextQuestion()
  } else {
    endQuiz()
  }
})

function startQuiz() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  currentQuestionIndex = 0
  questionContainer.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
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
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('incorrect')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('incorrect')
}

function endQuiz() {
  questionContainer.classList.add('hide')
  startButton.classList.remove('hide')
  startButton.innerText = 'Restart'
}
