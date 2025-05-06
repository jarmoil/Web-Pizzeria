import {test, expect} from '@playwright/test';

test.describe('Front page', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/');
  });

  test('should display header elements', async ({page}) => {
    await expect(page.getByRole('link', {name: 'Home'})).toBeVisible();
    await expect(
      page.getByRole('navigation').getByRole('link', {name: 'Menu'})
    ).toBeVisible();
    await expect(page.getByRole('link', {name: 'Location'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Cart'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Sign In'})).toBeVisible();
  });

  test('should display hero section', async ({page}) => {
    await expect(page.locator('#homepage-hero')).toBeVisible();
    await expect(
      page.getByText(
        'Tervetuloa Pápán Pizzeriaan!Herkullista pizzaa vuodesta 2001 astiKatso menu'
      )
    ).toBeVisible();
    await expect(page.getByRole('link', {name: 'Katso menu'})).toBeVisible();
  });

  test('should display main content sections', async ({page}) => {
    await expect(page.locator('#homepage-about div').first()).toBeVisible();
    await expect(
      page.getByRole('heading', {name: 'Päivän pizza'})
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {name: 'Asiakkaiden arvostelut'})
    ).toBeVisible();
    await expect(
      page.getByRole('heading', {name: 'Kuvagalleria'})
    ).toBeVisible();
  });

  test('should display footer information', async ({page}) => {
    await expect(
      page.getByRole('heading', {name: 'Aukioloajat'})
    ).toBeVisible();
    await expect(page.getByRole('heading', {name: 'Osoite'})).toBeVisible();
    await expect(page.getByText('Pápán Pizzeria, Helsinginkatu')).toBeVisible();
    await expect(page.getByRole('heading', {name: 'Contact Us'})).toBeVisible();
  });
});
