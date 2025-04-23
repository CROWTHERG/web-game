import { auth, db } from "./auth.js";
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Game setup
const cards = [
  { id: 1, value: "A", flipped: false },
  { id: 2, value: "A", flipped: false },
  { id: 3, value: "B", flipped: false },
  { id: 4, value: "B", flipped: false },
  // Add more pairs here if needed
];

let flippedCards = [];
let score = 0;
let gameTime = 30;
let timer;

// Shuffle cards
function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// Start game
function startGame() {
  score = 0;
  flippedCards = [];
  gameTime = 30;
  shuffleCards();
  renderCards();
  startTimer();
}

// Timer countdown
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

// Render cards
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

// Flip logic
function flipCard(event) {
  const cardId = event.target.dataset.id;
  const card = cards.find((c) => c.id == cardId);

  if (!card.flipped && flippedCards.length < 2) {
    card.flipped = true;
    event.target.innerText = card.value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

// Match check
function checkMatch() {
  if (flippedCards[0].value === flippedCards[1].value) {
    score++;
  } else {
    flippedCards.forEach((card) => {
      card.flipped = false;
      const cardElement = document.querySelector(`[data-id='${card.id}']`);
      cardElement.innerText = "";
    });
  }
  flippedCards = [];
}

// Game end
function endGame() {
  alert(`Game Over! Your score is ${score}`);
  saveScore(score, "Quick Flip");
}

// Save score to Firestore
async function saveScore(score, gameName) {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const data = userDoc.data();

    await addDoc(collection(db, "scores"), {
      userId: user.uid,
      username: data.username,
      game: gameName,
      score: score,
      timestamp: Timestamp.now()
    });
  } catch (error) {
    console.error("Error saving score:", error);
  }
}

// Auth state logic
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const data = userDoc.data();
    document.getElementById("username").innerText = data.username;
    document.getElementById("avatar").src = `assets/avatars/${data.avatar}`;
  } else {
    window.location.href = "login.html";
  }
});

// Event listeners
document.getElementById("start-btn").addEventListener("click", startGame);
