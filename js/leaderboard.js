import { db } from "./auth.js";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const leaderboardContainer = document.getElementById("leaderboard-list");

async function loadLeaderboard() {
  const q = query(collection(db, "scores"), orderBy("score", "desc"));
  const querySnapshot = await getDocs(q);
  leaderboardContainer.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const item = document.createElement("div");
    item.classList.add("leaderboard-item");
    item.innerHTML = `
      <img src="assets/avatars/${data.avatar}" alt="avatar">
      <span>${data.username}</span>
      <strong>${data.score}</strong>
    `;
    leaderboardContainer.appendChild(item);
  });
}

loadLeaderboard();
