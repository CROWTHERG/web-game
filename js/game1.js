let box = document.getElementById("color-box");
let statusText = document.getElementById("status");
let score = 0;
let gameStarted = false;

function startColorGame() {
  statusText.textContent = "Wait for green...";
  box.style.backgroundColor = "red";
  let delay = Math.random() * 2000 + 1000;

  setTimeout(() => {
    box.style.backgroundColor = "green";
    gameStarted = true;
    statusText.textContent = "Tap now!";
  }, delay);
}

box.addEventListener("click", () => {
  if (!gameStarted) {
    statusText.textContent = "Too Soon!";
  } else {
    score += 1;
    statusText.textContent = "Nice! Score: " + score;
    gameStarted = false;
    startColorGame();
  }
});

startColorGame();
