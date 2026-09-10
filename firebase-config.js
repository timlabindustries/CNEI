import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your CNEI Portal Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6Bv2YlZq9wXW8p7psOw6YmNoCfOO8Na0",
  authDomain: "cnei-portal.firebaseapp.com",
  databaseURL: "https://cnei-portal-default-rtdb.firebaseio.com",
  projectId: "cnei-portal",
  storageBucket: "cnei-portal.firebasestorage.app",
  messagingSenderId: "624049854394",
  appId: "1:624049854394:web:7572a797d810487f3f2f83"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const lockdownRef = ref(db, 'cnei_lockdown_state');
export { set, onValue };
