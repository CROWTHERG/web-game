// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCg3yTMngxdAc8jWrwU5GzBlShM4W3y9Io",
  authDomain: "web-mini-game-8912d.firebaseapp.com",
  projectId: "web-mini-game-8912d",
  storageBucket: "web-mini-game-8912d.appspot.com",
  messagingSenderId: "177663160227",
  appId: "1:177663160227:web:c7a3b2c717e45765213416",
  measurementId: "G-T4P9V14C4E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign up function
async function signUp(email, password, username) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create a new user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      username: username,
      avatar: getRandomAvatar(),
      email: email
    });

    // Redirect to profile page after successful signup
    window.location.href = "profile.html";
  } catch (error) {
    console.error("Signup error:", error);
    alert("Error: " + error.message);
  }
}

// Login function
async function logIn(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirect to homepage after successful login
    window.location.href = "index.html";
  } catch (error) {
    console.error("Login error:", error);
    alert("Invalid credentials or user not found.");
  }
}

// Logout function
async function logOut() {
  try {
    await signOut(auth);
    // Redirect to login page after logout
    window.location.href = "login.html";
  } catch (error) {
    console.error("Logout error:", error);
    alert("Error logging out. Please try again.");
  }
}

// Helper: pick a random avatar
function getRandomAvatar() {
  const avatars = ["avatar1.png", "avatar2.png", "avatar3.png", "avatar4.png", "avatar5.png"];
  return avatars[Math.floor(Math.random() * avatars.length)];
}

// Export functions and constants
export { signUp, logIn, logOut, auth, db };
