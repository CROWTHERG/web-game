// auth.js - Handling Sign-Up and Login

// Sign-up function
function signUp() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const userExists = localStorage.getItem(username);
  
    if (userExists) {
      alert("Username already exists!");
    } else {
      localStorage.setItem(username, JSON.stringify({ username, password }));
      alert("Sign-up successful! You can now log in.");
      window.location.href = "login.html"; // Redirect to login page
    }
  }
  
  // Login function
  function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const user = JSON.parse(localStorage.getItem(username));
  
    if (user && user.password === password) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "index.html"; // Redirect to homepage after login
    } else {
      alert("Invalid username or password!");
    }
  }
  