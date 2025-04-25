import { auth, db } from "./auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const profileContainer = document.getElementById("profile-container");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      profileContainer.innerHTML = `
        <h2>Welcome, ${data.username}!</h2>
        <img src="assets/avatars/${data.avatar}" alt="Avatar" class="avatar-large">
        <p>Email: ${user.email}</p>
      `;
    } else {
      profileContainer.innerHTML = "<p>User data not found.</p>";
    }
  } else {
    profileContainer.innerHTML = "<p>You must be logged in to view your profile.</p>";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  }
});
