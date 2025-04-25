import { signUp } from "./auth.js";

document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const username = document.getElementById("signup-username").value.trim();

  if (!email || !password || !username) {
    alert("All fields are required.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  signUp(email, password, username);
});
