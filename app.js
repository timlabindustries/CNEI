// Load Firebase SDKs dynamically
const script1 = document.createElement('script');
script1.src = "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js";
document.head.appendChild(script1);

const script2 = document.createElement('script');
script2.src = "https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js";
document.head.appendChild(script2);

script2.onload = function() {
  const firebaseConfig = {
    apiKey: "AIzaSyC3Pq29bAViHJOMq4CyxRx092u7vrJJLVk",
    authDomain: "cnei-system.firebaseapp.com",
    databaseURL: "https://cnei-system-default-rtdb.firebaseio.com",
    projectId: "cnei-system",
    storageBucket: "cnei-system.firebasestorage.app",
    messagingSenderId: "55065590531",
    appId: "1:55065590531:web:75d3f071512507c2aa8736"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.database();

  // Multi-language dictionary
  window.cneiLang = {
    en: {
      tagline: "A non-partisan open-source intelligence research collective dedicated to rigorous data verification, analytical transparency, and secure web architecture.",
      explore: "Explore Publications",
      rights: "© 2026 CNEI Collective. All rights reserved.",
      staffAccess: "Staff Area",
      lockdownHeader: "LOCKDOWN",
      loginBtn: "Staff Dashboard Login"
    },
    cy: {
      tagline: "Casgliad ymchwil cudd-wybodaeth ffynhonnell agored anbleidiol sy'n ymroddedig i wirio data trwyadl, tryloywder dadansoddol, a phensaernïaeth we ddiogel.",
      explore: "Archwilio Cyhoeddiadau",
      rights: "© 2026 CNEI Collective. Cedwir pob hawl.",
      staffAccess: "Ardal Staff",
      lockdownHeader: "CLASUR / LOCKDOWN",
      loginBtn: "Mewngofnodi i'r Ddasfwrdd Staff"
    }
  };

  window.changeLanguage = function(lang) {
    localStorage.setItem('cnei_lang', lang);
    const t = window.cneiLang[lang];
    if (!t) return;
    const tagEl = document.getElementById('lang-tagline');
    const expEl = document.getElementById('lang-explore');
    if (tagEl) tagEl.innerText = t.tagline;
    if (expEl) expEl.innerText = t.explore;
  };

  // Real-time Public Lockdown Listener
  db.ref('system/lockdown').on('value', (snapshot) => {
    const data = snapshot.val();
    const isLockdown = data && data.active;
    const message = (data && data.message) ? data.message : "System under temporary security lockdown.";
    const currentLang = localStorage.getItem('cnei_lang') || 'en';
    const t = window.cneiLang[currentLang] || window.cneiLang.en;

    let publicOverlay = document.getElementById('public-lockdown-screen');

    if (isLockdown) {
      if (!publicOverlay) {
        publicOverlay = document.createElement('div');
        publicOverlay.id = 'public-lockdown-screen';
        publicOverlay.style.cssText = `
          position: fixed; inset: 0; background: #FEF08A; color: #111827;
          z-index: 9999999; display: flex; flex-direction: column;
          justify-content: center; align-items: center; text-align: center;
          padding: 2rem; font-family: system-ui, -apple-system, sans-serif;
        `;
        document.body.appendChild(publicOverlay);
      }
      publicOverlay.innerHTML = `
        <div style="background: #DC2626; color: #FFF; padding: 0.5rem 1.5rem; font-weight: 800; font-size: 1.25rem; border-radius: 4px; margin-bottom: 1.5rem; animation: pulseFlash 1s infinite;">
          ⚠️ ${t.lockdownHeader} — ACTIVE SECURITY PROTOCOL
        </div>
        <h1 style="font-size: 2.2rem; font-weight: 800; margin-bottom: 1rem; color: #111827;">System Lockdown Engaged</h1>
        <p style="font-size: 1.15rem; color: #374151; max-width: 650px; line-height: 1.6; margin-bottom: 2rem;">${message}</p>
        <a href="login.html" style="padding: 0.85rem 2rem; background: #111827; color: #FFF; font-weight: 700; text-decoration: none; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">${t.loginBtn}</a>
      `;
      document.body.style.overflow = 'hidden';
    } else if (publicOverlay) {
      publicOverlay.remove();
      document.body.style.overflow = '';
    }
  });

  // Global 5-second popup listener for staff dashboards
  db.ref('system/lockdown').on('child_changed', (snapshot) => {
    // handled globally via value event if needed
  });
};
