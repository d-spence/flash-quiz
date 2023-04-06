const quizContainer = document.getElementById('quiz-container');
const cardEl = document.getElementById('card');
const cardHeadingEl = document.getElementById('card-heading');
const cardTextEl = document.getElementById('card-text');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const randomBtn = document.getElementById('random');

const settingsURL = 'http://localhost:3000/Settings';
const quizURL = 'http://localhost:3000/Quiz';
let quiz;
let settings;
let cardIdx = 0;
let cardIsFlipped = false; // the question side of the card is the unflipped side

const fetchQuizData = async () => {
  const resQuiz = await fetch(quizURL);
  const resSettings = await fetch(settingsURL);
  quiz = await resQuiz.json();
  settings = await resSettings.json();
  cardIsFlipped = settings.startFlipped;

  randomCard();
}

const updateCard = (showAnswer=false, newCard=false) => {
  if (newCard) {
    console.log('new card is flipped: ', settings.startFlipped)
    showAnswer = (settings && settings.startFlipped);
  }

  if (showAnswer) {
    cardHeadingEl.innerText = "ANSWER";
    cardTextEl.innerText = quiz[cardIdx].ANSWER;
    cardIsFlipped = true;
    console.log('card updated (answer side)');
  } else {
    cardHeadingEl.innerText = `QUESTION #${cardIdx + 1}`;
    cardTextEl.innerText = `${quiz[cardIdx].QUESTION}${settings.showQMark ? '?': ''}`;
    cardIsFlipped = false;
    console.log('card updated (question side)');
  }
}

const flipCard = () => {
  if (cardIsFlipped) {
    setTimeout(() => updateCard(showAnswer=false), 250);
    console.log('card is flipping (to question side)');
  } else {
    setTimeout(() => updateCard(showAnswer=true), 250);
    console.log('card is flipping (to answer side)');
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
  if (cardIdx >= quiz.length) {
    cardIdx = 0;
  }
  updateCard(showAnswer=false, newCard=true);
}

const prevCard = () => {
  cardIdx -= 1;
  if (cardIdx < 0) {
    cardIdx = quiz.length - 1;
  }
  updateCard(showAnswer=false, newCard=true);
}

const randomCard = () => {
  cardIdx = Math.floor(Math.random() * quiz.length - 0);
  updateCard(showAnswer=false, newCard=true);
}

fetchQuizData();

cardTextEl.addEventListener('click', () => flipCard());
nextBtn.addEventListener('click', () => nextCard());
prevBtn.addEventListener('click', () => prevCard());
randomBtn.addEventListener('click', () => randomCard());
