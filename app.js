// Synchronized Global State & Lockdown Engine
(function () {
  const channel = new BroadcastChannel('cnei_system_channel');
  let audioContext = null;
  let BEEP_INTERVAL = null;

  // Synthesis of Emergency Beeping Sound (No external audio file needed)
  function playEmergencyBeep() {
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, audioContext.currentTime); // High pitch alert
      gain.gain.setValueAtTime(0.15, audioContext.currentTime);
      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + 0.15);
    } catch (e) {
      console.warn("Audio context restricted until user interaction.");
    }
  }

  function triggerLockdownUI(active, message) {
    const overlay = document.getElementById('lockdown-overlay');
    const msgElement = document.getElementById('lockdown-custom-msg');
    const leds = document.querySelectorAll('.status-led');

    if (active) {
      if (overlay) overlay.classList.add('active');
      if (msgElement) msgElement.innerText = message || "CONDITION RED: All public operations suspended by Director mandate.";
      leds.forEach(led => led.classList.add('lockdown'));

      if (!BEEP_INTERVAL) {
        playEmergencyBeep();
        BEEP_INTERVAL = setInterval(playEmergencyBeep, 1200);
      }
    } else {
      if (overlay) overlay.classList.remove('active');
      leds.forEach(led => led.classList.remove('lockdown'));

      if (BEEP_INTERVAL) {
        clearInterval(BEEP_INTERVAL);
        BEEP_INTERVAL = null;
      }
    }
  }

  function syncState() {
    const isLockdown = localStorage.getItem('cnei_lockdown_active') === 'true';
    const msg = localStorage.getItem('cnei_lockdown_message');
    triggerLockdownUI(isLockdown, msg);
  }

  // Listen for real-time messages across browser tabs/windows
  channel.onmessage = (event) => {
    if (event.data && event.data.type === 'LOCKDOWN_STATE_CHANGE') {
      syncState();
    }
  };

  window.addEventListener('storage', syncState);

  document.addEventListener('DOMContentLoaded', () => {
    syncState();
  });
})();
