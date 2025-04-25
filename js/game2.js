let cards = document.querySelectorAll(".card");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchCount = 0;
let totalPairs = cards.length / 2;
let gameStarted = false;

// Check user login from localStorage
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Shuffle cards
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    gameStarted = true;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  matchCount++;

  if (matchCount === totalPairs) {
    setTimeout(() => {
      alert("🎉 You Win!");
      if (currentUser) {
        saveScore("Quick Flip", totalPairs);
      }
    }, 600);
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function saveScore(game, score) {
  const db = firebase.firestore();
  db.collection("leaderboard").add({
    username: currentUser.username,
    game: game,
    score: score,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    avatar: currentUser.avatar
  }).catch(err => {
    console.error("Failed to save score:", err);
  });
}

cards.forEach(card => card.addEventListener("click", flipCard));
