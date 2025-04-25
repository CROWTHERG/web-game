import { auth, db } from "./auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Function to show loading spinner
function showLoadingSpinner() {
  const spinner = document.getElementById("loading-spinner");
  if (spinner) spinner.style.display = "block";  // Show spinner
}

// Function to hide loading spinner
function hideLoadingSpinner() {
  const spinner = document.getElementById("loading-spinner");
  if (spinner) spinner.style.display = "none";  // Hide spinner
}

// Update navbar based on auth state
async function updateNavbar(userData = null) {
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

// Auth state listener
onAuthStateChanged(auth, async (user) => {
  showLoadingSpinner();  // Show loading spinner while checking auth state
  try {
    if (user) {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        updateNavbar(docSnap.data());
      } else {
        console.error("User document not found in Firestore.");
        updateNavbar(null);  // Update navbar to show login/signup options
      }
    } else {
      updateNavbar(null);  // Update navbar to show login/signup options
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    updateNavbar(null);  // Update navbar to show login/signup options
  } finally {
    hideLoadingSpinner();  // Hide loading spinner after auth state is checked
  }
});
