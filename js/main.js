import { auth, db } from "./auth.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Update navbar based on Firebase auth state
function updateNavbar(userData = null) {
  const nav = document.querySelector(".nav-links");

  if (!nav) return;

  if (userData) {
    nav.innerHTML = `
      <div class="user-profile">
        <img src="assets/avatars/${userData.avatar}" alt="Avatar" class="avatar">
        <span>${userData.username}</span>
        <a href="leaderboard.html">Leaderboard</a>
        <a href="#" id="logout-btn">Logout</a>
      </div>
    `;

    document.getElementById("logout-btn").addEventListener("click", async () => {
      await signOut(auth);
      window.location.href = "index.html";
    });
  } else {
    nav.innerHTML = `
      <a href="login.html">Login</a>
      <a href="signup.html">Sign Up</a>
    `;
  }
}

// Firebase Auth listener
onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        updateNavbar(docSnap.data());
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  } else {
    updateNavbar(null);
  }
});
