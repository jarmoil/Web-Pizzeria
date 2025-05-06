import {test, expect} from '@playwright/test';

test.describe('Menu and Cart Operations', () => {
  test.beforeEach(async ({page}) => {
    // Start from menu page before each test
    await page.goto('http://localhost:5173/');
    await page
      .getByRole('navigation')
      .getByRole('link', {name: 'Menu'})
      .click();
  });

  test('should display menu item details correctly', async ({page}) => {
    await expect(page.getByRole('heading', {name: 'Hawaii'})).toBeVisible();
    await expect(page.getByText('Ananasta ja kinkkua')).toBeVisible();
    await expect(page.getByRole('img', {name: 'Hawaii'})).toBeVisible();
  });

  test('should display reviews for menu item', async ({page}) => {
    await page.locator('.menu-card-button-reviews').first().click();
    await expect(page.getByText('5 ★4/30/2025ananas kuuluu')).toBeVisible();
    await page.getByRole('button', {name: '×'}).click();
  });

  test('should handle cart quantity changes', async ({page}) => {
    // Add item to cart
    await page.locator('.menu-card-button-add').first().click();
    await page.getByRole('button', {name: 'Cart'}).click();
    await expect(page.getByText('×Your CartHawaii-1+€10.')).toBeVisible();

    // Test quantity controls
    await page.getByRole('button', {name: '+'}).click();
    await expect(page.getByText('2', {exact: true})).toBeVisible();
    await page.getByRole('button', {name: '-'}).click();
    await expect(
      page.locator('#cart-items').getByText('1', {exact: true})
    ).toBeVisible();
  });

  test('should handle cart item removal', async ({page}) => {
    // Add item and open cart
    await page.locator('.menu-card-button-add').first().click();
    await page.getByRole('button', {name: 'Cart'}).click();

    // Remove item and verify empty cart
    await page.getByRole('button', {name: 'Remove'}).click();
    await page.getByRole('button', {name: 'Checkout'}).click();
    await expect(page.getByText('Your cart is empty. Add items')).toBeVisible();
    await page.getByRole('button', {name: '×'}).click();
  });
});
