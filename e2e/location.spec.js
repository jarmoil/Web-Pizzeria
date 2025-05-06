import {test, expect} from '@playwright/test';

test.describe('Location Page', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/');
    await page.getByRole('link', {name: 'Location'}).click();
  });

  test('should display heading and address', async ({page}) => {
    await expect(
      page.getByRole('heading', {name: 'Sijaintimme'})
    ).toBeVisible();
    await expect(page.getByText('Helsinginkatu 1 00010,')).toBeVisible();
  });

  test('should display Google Maps', async ({page}) => {
    const mapFrame = page.locator('iframe[title="Google Maps"]');
    await expect(mapFrame).toBeVisible();
  });
});
