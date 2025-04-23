// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
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
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign up function
function signUp(email, password, username) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return setDoc(doc(db, "users", user.uid), {
        username: username,
        avatar: getRandomAvatar()
      });
    })
    .then(() => {
      window.location.href = "profile.html";
    })
    .catch((error) => {
      console.error("Sign-up error:", error.message);
      alert(error.message);
    });
}

// Login function
function logIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      alert("Invalid credentials or user not found.");
    });
}

// Log out function
function logOut() {
  signOut(auth)
    .then(() => {
      window.location.href = "login.html";
    })
    .catch(console.error);
}

// Helper to pick a random avatar
function getRandomAvatar() {
  const avatars = ["avatar1.png", "avatar2.png", "avatar3.png", "avatar4.png"];
  return avatars[Math.floor(Math.random() * avatars.length)];
}

// Export functions if using ES modules
export { signUp, logIn, logOut, auth, db };
