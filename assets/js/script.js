// Questions with their respective answers
const questions = [
  { question: "Which programming language is used for web development?", options: ["HTML", "Python", "JavaScript", "CSS"], correctAnswer: "JavaScript" },
  { question: "How do you declare a function in JavaScript?", options: ["function myFunction() { }", "const myFunction = function() { }", "myFunction: function() { }", "function = myFunction() { }"], correctAnswer: "function myFunction() { }" },
  { question: "Arrays in Javascript can be used to store", options: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the above"], correctAnswer: "All of the above" },
  { question: "The condition in an If-Else statement is enclosed with?", options: ["Quotes", "Paranthesis", "Square Brackets", "Curly Brackets"], correctAnswer: "Paranthesis" },
  { question: "Which is not included in a CSS Box Model?", options: ["Border", "Padding", "Margin", "Flexbox"], correctAnswer: "Flexbox" },
  ];
  

const quizContainer = document.getElementById('quiz-container');
const startBtn = document.getElementById('start-btn');
const questionDiv = document.getElementById('question');
const optionsDiv = document.getElementById('options');
const timerDiv = document.getElementById('timer');
const timeSpan = document.getElementById('time');
const gameOverContainer = document.getElementById('game-over-container');
const initialsInput = document.getElementById('initials');
const submitScoreBtn = document.getElementById('submit-score');

// Time in seconds
let currentQuestionIndex = 0;
let timeLeft = 60; 

startBtn.addEventListener('click', startQuiz);
submitScoreBtn.addEventListener('click', saveScore);

function startQuiz() {
  startBtn.style.display = 'none';
  quizContainer.style.display = 'block';
  showQuestion();
  startTimer();
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionDiv.textContent = currentQuestion.question;
  optionsDiv.innerHTML = '';

  currentQuestion.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.addEventListener('click', () => checkAnswer(option));
      optionsDiv.appendChild(button);
  });
}

function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedOption === currentQuestion.correctAnswer) {
      // Correct answer
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
          showQuestion();
      } else {
          endGame();
      }
  } else {
      // Incorrect answer, deduct 10 seconds for incorrect answer
      timeLeft -= 10; 
      if (timeLeft <= 0) {
          timeLeft = 0;
          endGame();
      }
  }
}

function startTimer() {
  const timerInterval = setInterval(() => {
      timeSpan.textContent = timeLeft;
      timeLeft--;

      if (timeLeft < 0) {
          clearInterval(timerInterval);
          endGame();
      }
  }, 1000);
}

function endGame() {
  quizContainer.style.display = 'none';
  gameOverContainer.style.display = 'block';
  timeSpan.textContent = timeLeft;
}

function saveScore() {
  const initials = initialsInput.value;
  if (initials.trim() !== '') {
      // Saves the score
      alert(`Score saved! Initials: ${initials}, Score: ${timeLeft}`);
  } else {
      alert('Please enter your initials.');
  }
}
