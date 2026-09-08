// Silent background polling system (Zero-cookie / Non-disruptive)
(function () {
  const POLL_INTERVAL = 3000;

  function checkSystemStatus() {
    // Fetches live status JSON without disrupting scrolling or view state
    fetch('status.json', { cache: 'no-store' })
      .then(response => response.json())
      .then(data => {
        const led = document.getElementById('telemetry-led');
        if (led) {
          led.style.backgroundColor = 'var(--led-green)';
          led.style.boxShadow = '0 0 8px var(--led-green)';
        }

        const overlay = document.getElementById('lockdown-overlay');
        if (data.lockdown && overlay) {
          overlay.classList.add('active');
        } else if (overlay) {
          overlay.classList.remove('active');
        }
      })
      .catch(() => {
        // Red LED indicates network connection fail or background sync lost
        const led = document.getElementById('telemetry-led');
        if (led) {
          led.style.backgroundColor = 'var(--led-red)';
          led.style.boxShadow = '0 0 8px var(--led-red)';
        }
      });
  }

  document.addEventListener('DOMContentLoaded', () => {
    checkSystemStatus();
    setInterval(checkSystemStatus, POLL_INTERVAL);
  });
})();
