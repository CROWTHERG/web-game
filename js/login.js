import { logIn } from "./auth.js";

// Handle form submission and login logic
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();  // Prevent default form submission

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (validateForm(email, password)) {
    try {
      await logIn(email, password);  // Attempt to log the user in
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  }
});

// Form validation to ensure both email and password are provided
function validateForm(email, password) {
  if (!email || !password) {
    alert("Please fill in both fields.");
    return false;
  }
  return true;
}
