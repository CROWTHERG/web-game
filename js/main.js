// Helper to get data from localStorage
function getUser() {
  return JSON.parse(localStorage.getItem("user")) || null;
}

// Update navbar based on login state
function updateNavbar() {
  const nav = document.querySelector(".nav-links");
  const user = getUser();

  if (!nav) return;

  if (user) {
    nav.innerHTML = `
      <div class="user-profile">
        <img src="assets/avatars/avatar1.png" alt="Avatar" class="avatar">
        <span>${user.username}</span>
        <a href="leaderboard.html">Leaderboard</a>
        <a href="#" onclick="logout()">Logout</a>
      </div>
    `;
  } else {
    nav.innerHTML = `
      <a href="login.html">Login</a>
      <a href="signup.html">Sign Up</a>
    `;
  }
}

// Logout function
function logout() {
  localStorage.removeItem("user");
  alert("Logged out!");
  window.location.href = "index.html";
}

// Call update on page load
document.addEventListener("DOMContentLoaded", updateNavbar);

// Sign-up form logic (integrated into main.js)
document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const takenUsernames = ["admin", "guest"];

  if (takenUsernames.includes(username.toLowerCase())) {
    document.getElementById("username-error").style.display = "block";
  } else {
    // Save user data to localStorage (simulate sign-up)
    const newUser = { username, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    window.location.href = "index.html";
  }
});
