import './styles.css';
import './App';
import { isDev, windowResize } from '@utils/helpers';

windowResize();
window.setTimeout(() => windowResize(), 1000);
window.addEventListener('resize', () => windowResize());

if (!isDev) {
  'serviceWorker' in navigator &&
    navigator.serviceWorker.register('service-worker.js');

  /*
  // @ts-ignore
  window.installPrompt = null;
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    // @ts-ignore
    window.installPrompt = e;
  });
   */
}
