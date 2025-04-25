import { auth, signOut } from "./auth.js";

// Check if user is logged in and display user info or login/signup buttons
auth.onAuthStateChanged((user) => {
  const userInfo = document.getElementById("user-info");
  if (user) {
    userInfo.innerHTML = `
      <img src="assets/avatars/${user.avatar || 'default-avatar.png'}" alt="avatar" />
      <p>Welcome, ${user.displayName}</p>
      <button id="logout-btn">Logout</button>
    `;
    document.getElementById("logout-btn").addEventListener("click", () => {
      signOut(auth);
    });
  } else {
    userInfo.innerHTML = `
      <button onclick="window.location.href='login.html'">Login</button>
      <button onclick="window.location.href='signup.html'">Sign Up</button>
    `;
  }
});
