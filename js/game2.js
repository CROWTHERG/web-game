import { db } from "./auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

async function saveScore(username, score, avatar) {
  try {
    const docRef = await addDoc(collection(db, "scores"), {
      username: username,
      score: score,
      avatar: avatar,
      timestamp: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
