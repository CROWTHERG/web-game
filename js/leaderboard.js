import { db } from "./auth.js"; // Make sure you import db from auth.js to access Firestore

// Function to load the leaderboard
function loadLeaderboard(gameName) {
  const leaderboardContainer = document.getElementById("leaderboard-body");
  
  // Clear previous leaderboard
  leaderboardContainer.innerHTML = "";

  // Fetch top 10 players from Firestore for the given game
  db.collection("scores")
    .where("game", "==", gameName)
    .orderBy("score", "desc")
    .limit(10)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc, index) => {
        const data = doc.data();
        
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${index + 1}</td>
          <td><img src="assets/avatars/${data.avatar || 'default.png'}" alt="avatar" class="avatar-small"></td>
          <td>${data.username}</td>
          <td>${data.score}</td>
        `;
        
        leaderboardContainer.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error loading leaderboard: ", error);
    });
}

// Call the function for a specific game
document.addEventListener("DOMContentLoaded", () => {
  loadLeaderboard("Color Chase");  // Replace with dynamic game name if needed
});
