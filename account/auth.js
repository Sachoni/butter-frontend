import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔥 REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyAw1sqpMMBt3zxAf2NggiZsj6rhhXgnE0Y",
  authDomain: "butter-ecommerce.firebaseapp.com",
  projectId: "butter-ecommerce",
  appId: "1:936911351357:web:cb088316107eaa89778454"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// EMAIL + PASSWORD LOGIN
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "../dashboard.html";
  } catch (error) {
    alert(error.message);
  }
};

// GOOGLE LOGIN
window.googleLogin = async () => {
  try {
    await signInWithPopup(auth, provider);
    window.location.href = "../dashboard.html";
  } catch (error) {
    alert(error.message);
  }
};

// PROTECT LOGIN PAGE (if already logged in)
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in as:", user.email);
  }
});
