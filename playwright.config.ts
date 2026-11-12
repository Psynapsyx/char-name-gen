// Playwright Test config for end-to-end tests in e2e/.
// By default, webServer builds the app and serves the production build, so
// tests run against what we actually ship rather than the dev server.
// Set PLAYWRIGHT_BASE_URL to test an already-running site instead (the deploy
// workflow uses this to smoke test the live GitHub Pages site).
import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
// Must match `base` in vite.config.ts. The trailing slash matters: tests call
// page.goto('./'), which resolves relative to this URL.
const localURL = `http://localhost:${PORT}/char-name-gen/`;
const remoteURL = withTrailingSlash(process.env.PLAYWRIGHT_BASE_URL);
const isCI = Boolean(process.env.CI);

function withTrailingSlash(url: string | undefined): string | undefined {
  if (!url) return undefined;
  return url.endsWith('/') ? url : `${url}/`;
}

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: remoteURL ?? localURL,
    trace: 'retain-on-failure',
    // On failure, attach a screenshot, video and trace to the HTML report.
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: remoteURL
    ? undefined
    : {
        command: `npm run build && npm run preview -- --port ${PORT} --strictPort`,
        url: localURL,
        reuseExistingServer: !isCI,
        timeout: 120_000,
      },
});
