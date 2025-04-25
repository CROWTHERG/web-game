import { auth, db } from "./auth.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const userProfileContainer = document.getElementById("user-profile");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (docSnap.exists()) {
      const userData = docSnap.data();
      userProfileContainer.innerHTML = `
        <h2>Welcome, ${userData.username}</h2>
        <img src="assets/avatars/${userData.avatar}" alt="${userData.username}'s avatar" class="avatar">
        <p>Email: ${user.email}</p>
        <button onclick="logOut()">Logout</button>
      `;
    }
  } else {
    window.location.href = "login.html";
  }
});

function logOut() {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  }).catch(console.error);
}
