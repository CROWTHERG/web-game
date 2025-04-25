import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCg3yTMngxdAc8jWrwU5GzBlShM4W3y9Io",
  authDomain: "web-mini-game-8912d.firebaseapp.com",
  projectId: "web-mini-game-8912d",
  storageBucket: "web-mini-game-8912d.firebasestorage.app",
  messagingSenderId: "177663160227",
  appId: "1:177663160227:web:c7a3b2c717e45765213416",
  measurementId: "G-T4P9V14C4E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };
