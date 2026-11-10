import { expect, test } from '@playwright/test';

test('loads the home page with title and heading', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Character Name Generator');
  await expect(
    page.getByRole('heading', { level: 1, name: 'Character Name Generator' }),
  ).toBeVisible();
});
