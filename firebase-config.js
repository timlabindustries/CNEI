import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, push, remove, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Replace with your legitimate Firebase project configuration credentials
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "cnei-operational.firebaseapp.com",
  databaseURL: "https://cnei-operational-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cnei-operational",
  storageBucket: "cnei-operational.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { ref, set, get, push, remove, onValue };
