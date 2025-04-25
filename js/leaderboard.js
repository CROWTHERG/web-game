import { db } from "./auth.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const leaderboardContainer = document.getElementById("leaderboard-list");
const spinner = document.getElementById("loading-spinner"); // Spinner element

async function loadLeaderboard() {
  spinner.style.display = "block"; // Show spinner
  leaderboardContainer.innerHTML = ""; // Clear leaderboard

  try {
    const q = query(collection(db, "scores"), orderBy("score", "desc"));
    const querySnapshot = await getDocs(q);
    spinner.style.display = "none"; // Hide spinner

    if (querySnapshot.empty) {
      leaderboardContainer.innerHTML = "<p>No leaderboard data available.</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const avatar = data.avatar ? data.avatar : "default-avatar.png"; // Fallback avatar

      const item = document.createElement("div");
      item.classList.add("leaderboard-item");
      item.innerHTML = `
        <img src="assets/avatars/${avatar}" alt="${data.username}'s avatar">
        <span>${data.username}</span>
        <strong>${data.score}</strong>
      `;
      leaderboardContainer.appendChild(item);
    });
  } catch (error) {
    console.error("Error loading leaderboard:", error);
    spinner.style.display = "none"; // Hide spinner
    leaderboardContainer.innerHTML = "<p>There was an error loading the leaderboard. Please try again later.</p>";
  }
}

loadLeaderboard();
