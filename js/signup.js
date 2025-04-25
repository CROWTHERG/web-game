import { signUp } from "./auth.js";

// Handle form submission and signup logic
document.getElementById("signup-form").addEventListener("submit", async function (e) {
  e.preventDefault();  // Prevent form from submitting the default way

  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const username = document.getElementById("signup-username").value.trim();

  // Validate the form fields
  if (!email || !password || !username) {
    alert("All fields are required.");
    return;
  }

  // Password length check
  if (password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  try {
    // Attempt to sign up the user
    await signUp(email, password, username);
  } catch (error) {
    console.error("Signup error:", error);
    alert("An error occurred while signing up. Please try again.");
  }
});
