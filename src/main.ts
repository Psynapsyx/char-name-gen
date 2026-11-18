// App entry point. The page markup lives in index.html; behaviour is added by later issues.
import './style.css';
import { formatVersion } from './version/formatVersion';

const versionElement = document.querySelector<HTMLElement>('#app-version');
if (versionElement) {
  versionElement.textContent = formatVersion(__APP_VERSION__);
}
