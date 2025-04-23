import { auth, db } from "./auth.js";
import { collection, addDoc, Timestamp, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Game variables
let score = 0;
let gameTime = 30;
let timer;

// Start the game
function startGame() {
  score = 0;
  gameTime = 30;

  document.getElementById("start-btn").style.display = "none";
  document.getElementById("game-area").style.display = "block";

  startTimer();
  startColorCycle();
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

// Color switch logic
let currentColor = "red";
function startColorCycle() {
  const gameArea = document.getElementById("game-area");

  setInterval(() => {
    gameArea.style.backgroundColor = currentColor;
    currentColor = currentColor === "green" ? "red" : "green";
  }, 1000);
}

// Click handler
function clickColorArea() {
  const gameArea = document.getElementById("game-area");
  if (gameArea.style.backgroundColor === "green") {
    score++;
  }
}

// End game
function endGame() {
  alert(`Game Over! Your score is ${score}`);
  saveScore(score, "Color Chase");
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

// Auth state check
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
document.getElementById("game-area").addEventListener("click", clickColorArea);
