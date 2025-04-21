// game2.js - Quick Flip

// Sample card set for the memory game
const cards = [
  { id: 1, value: "A", flipped: false },
  { id: 2, value: "A", flipped: false },
  { id: 3, value: "B", flipped: false },
  { id: 4, value: "B", flipped: false },
  // Add more pairs of cards as needed
];

let flippedCards = [];
let score = 0;
let gameTime = 30;
let timer;

// Function to shuffle the cards
function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// Start the game
function startGame() {
  shuffleCards();
  renderCards();
  startTimer();
}

// Timer function
function startTimer() {
  const timerDisplay = document.getElementById("timer");
  timerDisplay.innerText = gameTime;

  timer = setInterval(() => {
    gameTime--;
    timerDisplay.innerText = gameTime;

    if (gameTime <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// Render cards on the game board
function renderCards() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";

  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = card.id;

    cardElement.addEventListener("click", flipCard);
    board.appendChild(cardElement);
  });
}

// Flip a card
function flipCard(event) {
  const cardId = event.target.dataset.id;
  const card = cards.find((card) => card.id == cardId);

  if (!card.flipped) {
    card.flipped = true;
    event.target.innerText = card.value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

// Check if two flipped cards match
function checkMatch() {
  if (flippedCards[0].value === flippedCards[1].value) {
    score++;
  } else {
    setTimeout(() => {
      flippedCards.forEach((card) => {
        card.flipped = false;
        const cardElement = document.querySelector(`[data-id='${card.id}']`);
        cardElement.innerText = "";
      });
    }, 1000);
  }

  flippedCards = [];
}

// End the game
function endGame() {
  alert(`Game Over! Your score is ${score}`);
  // Optionally, save score to localStorage or show leaderboard
}

document.getElementById("start-btn").addEventListener("click", startGame);
