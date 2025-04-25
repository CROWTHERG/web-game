let box = document.getElementById("color-box");
let statusText = document.getElementById("status");
let score = 0;
let gameStarted = false;
let gameTimeout = null;
let resetTimeout = null;

// Check user login from localStorage
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

function startColorGame() {
  statusText.textContent = "Wait for green...";
  box.style.backgroundColor = "red";
  gameStarted = false;

  let delay = Math.random() * 2000 + 1000;

  gameTimeout = setTimeout(() => {
    box.style.backgroundColor = "green";
    statusText.textContent = "Tap now!";
    gameStarted = true;
  }, delay);
}

function resetGame(message) {
  clearTimeout(gameTimeout);
  statusText.textContent = message;
  box.style.backgroundColor = "#e53935"; // Red error color
  gameStarted = false;

  // Reset back to start after a second
  resetTimeout = setTimeout(() => {
    startColorGame();
  }, 1000);
}

box.addEventListener("click", () => {
  if (!gameStarted) {
    resetGame("Too soon!");
  } else {
    score += 1;
    statusText.textContent = `Nice! Score: ${score}`;
    gameStarted = false;
    startColorGame();
  }
});

// Optional: save score on unload if logged in
window.addEventListener("beforeunload", () => {
  if (currentUser && score > 0) {
    saveScore("Color Chase", score);
  }
});

// Save score to Firebase
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

// Start the game
startColorGame();
