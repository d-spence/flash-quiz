const quizContainer = document.getElementById('quiz-container');
const cardEl = document.getElementById('card');
const cardTextEl = document.getElementById('card-text');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const randomBtn = document.getElementById('random');

const questionsURL = 'http://localhost:3000/Questions';
let questions;
let cardIdx = 0;
let flipped = false;

const fetchQuestions = async () => {
  const res = await fetch(questionsURL);
  questions = await res.json();
  console.log(questions);

  updateCard();
}

const updateCard = () => {
  cardTextEl.innerText = questions[cardIdx].QUESTION;
}

const flipCard = () => {
  if (flipped) {
    setTimeout(() => cardTextEl.innerText = questions[cardIdx].QUESTION, 500);
    flipped = false;
  } else {
    setTimeout(() => cardTextEl.innerText = questions[cardIdx].ANSWER, 500);
    flipped = true;
  }

  cardEl.classList.remove('flipped'); // reset animation
  cardTextEl.classList.remove('flipped');
  void cardEl.offsetWidth; // trigger reflow
  void cardTextEl.offsetWidth;
  cardEl.classList.add('flipped');
  cardTextEl.classList.add('flipped');
}

const nextCard = () => {
  cardIdx += 1;

  if (cardIdx >= questions.length) {
    cardIdx = 0;
  }

  updateCard();
}

const prevCard = () => {
  cardIdx += 1;

  if (cardIdx < 0) {
    cardIdx = questions.length - 1;
  }

  updateCard();
}

const randomCard = () => {
  cardIdx = Math.floor(Math.random() * questions.length - 0);
  updateCard();
}

fetchQuestions();

cardTextEl.addEventListener('click', () => flipCard());
nextBtn.addEventListener('click', () => nextCard());
prevBtn.addEventListener('click', () => prevCard());
randomBtn.addEventListener('click', () => randomCard());
