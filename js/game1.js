// game1.js - Color Chase

// Variables
let score = 0;
let gameTime = 30; // Game time in seconds
let timer;

// Start the game
function startGame() {
  const startButton = document.getElementById("start-btn");
  startButton.style.display = "none"; // Hide start button
  const gameArea = document.getElementById("game-area");
  gameArea.style.display = "block"; // Show the game area

  // Start the countdown timer
  startTimer();
  startColorCycle();
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

// Color cycle function
function startColorCycle() {
  const gameArea = document.getElementById("game-area");
  let currentColor = "red";

  setInterval(() => {
    if (currentColor === "green") {
      gameArea.style.backgroundColor = "green";
    } else {
      gameArea.style.backgroundColor = "red";
    }

    currentColor = currentColor === "green" ? "red" : "green";
  }, 1000);
}

// Click event handler for the color area
function clickColorArea() {
  const gameArea = document.getElementById("game-area");

  if (gameArea.style.backgroundColor === "green") {
    score++;
  }
}

// End the game and show the score
function endGame() {
  alert(`Game Over! Your score is ${score}`);
  // Optionally, save score to localStorage or show leaderboard
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ username: user.username, score });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }
}

document.getElementById("game-area").addEventListener("click", clickColorArea);
document.getElementById("start-btn").addEventListener("click", startGame);
