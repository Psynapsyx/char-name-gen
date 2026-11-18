import { expect, test } from '@playwright/test';
import packageJson from '../package.json' with { type: 'json' };

test('shows the version from package.json in the footer', async ({ page }) => {
  await page.goto('./');

  // A top-level <footer> has the implicit ARIA role "contentinfo".
  await expect(page.getByRole('contentinfo')).toContainText(`v${packageJson.version}`);
});
