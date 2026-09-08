// Dynamically load Firebase SDKs for plain static pages
const script1 = document.createElement('script');
script1.src = "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js";
document.head.appendChild(script1);

const script2 = document.createElement('script');
script2.src = "https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js";
document.head.appendChild(script2);

script2.onload = function() {
  // Your CNEI Firebase Configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC3Pq29bAViHJOMq4CyxRx092u7vrJJLVk",
    authDomain: "cnei-system.firebaseapp.com",
    databaseURL: "https://cnei-system-default-rtdb.firebaseio.com",
    projectId: "cnei-system",
    storageBucket: "cnei-system.firebasestorage.app",
    messagingSenderId: "55065590531",
    appId: "1:55065590531:web:75d3f071512507c2aa8736"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  // Real-time listener for global lockdown signal
  db.ref('system/lockdown').on('value', (snapshot) => {
    const data = snapshot.val();
    const isLockdown = data && data.active;
    const message = (data && data.message) ? data.message : "System under temporary maintenance.";

    let publicOverlay = document.getElementById('public-lockdown-screen');

    if (isLockdown) {
      if (!publicOverlay) {
        publicOverlay = document.createElement('div');
        publicOverlay.id = 'public-lockdown-screen';
        publicOverlay.style.cssText = `
          position: fixed; inset: 0; background: #FFFFFF; color: #000000;
          z-index: 9999999; display: flex; flex-direction: column;
          justify-content: center; align-items: center; text-align: center;
          padding: 2rem; font-family: system-ui, -apple-system, sans-serif;
        `;
        document.body.appendChild(publicOverlay);
      }
      publicOverlay.innerHTML = `
        <h1 style="font-size: 2.2rem; font-weight: 700; margin-bottom: 1rem;">System Maintenance</h1>
        <p style="font-size: 1.1rem; color: #4B5563; max-width: 600px;">${message}</p>
      `;
      document.body.style.overflow = 'hidden';
    } else if (publicOverlay) {
      publicOverlay.remove();
      document.body.style.overflow = '';
    }
  });
};
