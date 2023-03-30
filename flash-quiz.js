const quizContainer = document.getElementById('quiz-container');
const cardEl = document.getElementById('card');
const cardHeadingEl = document.getElementById('card-heading');
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

  randomCard();
}

const updateCard = () => {
  cardHeadingEl.innerText = `QUESTION #${cardIdx + 1}`;
  cardTextEl.innerText = `${questions[cardIdx].QUESTION}?`;
  flipped = false;
}

const flipCard = () => {
  if (flipped) {
    setTimeout(() => {
      cardHeadingEl.innerText = `QUESTION #${cardIdx + 1}`;
      cardTextEl.innerText = `${questions[cardIdx].QUESTION}?`;
    }, 500);
    flipped = false;
  } else {
    setTimeout(() => {
      cardHeadingEl.innerText = "ANSWER";
      cardTextEl.innerText = questions[cardIdx].ANSWER;
    }, 500);
    flipped = true;
  }

  cardEl.classList.remove('flipped'); // reset animation
  cardHeadingEl.classList.remove('flipped');
  cardTextEl.classList.remove('flipped');
  void cardEl.offsetWidth; // trigger reflow
  void cardHeadingEl.offsetWidth;
  void cardTextEl.offsetWidth;
  cardEl.classList.add('flipped');
  cardHeadingEl.classList.add('flipped');
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
  cardIdx -= 1;
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
