import './styles.css';
import './App';

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.setTimeout(() => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}, 1000);

window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

/**
 * ServiceWorker install
 */

window.serviceWorkerEvent = false;
if ('serviceWorker' in navigator && !isDev) {
  //if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(reg => {
      window.serviceWorkerEvent = reg;
      reg.onupdatefound = function() {
        const installing = reg.installing;
        installing.onstatechange = function() {
          console.log(installing);
          console.log(installing.state);
          if (
            installing.state === 'installed' &&
            !navigator.serviceWorker.controller
          ) {
            console.log('installed!');
          }
        };
      };
    })
    .catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
}
