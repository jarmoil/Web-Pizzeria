import {test, expect} from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:5173/');
  });

  test('should login and logout with existing user', async ({page}) => {
    // Login
    await page.getByRole('button', {name: 'Sign In'}).click();
    await page
      .getByPlaceholder('Email', {exact: true})
      .fill('pizzamaxxer@papas.com');
    await page.getByPlaceholder('Password', {exact: true}).fill('pizza12345');
    await page.getByRole('button', {name: 'Login'}).click();

    // Verify login successful
    await expect(page.getByRole('button', {name: 'Logout'})).toBeVisible();

    // Logout
    await page.getByRole('button', {name: 'Logout'}).click();
    await expect(page.getByRole('button', {name: 'Sign In'})).toBeVisible();
  });

  test('should register new user and login', async ({page}) => {
    // Open registration form
    await page.getByRole('button', {name: 'Sign In'}).click();
    await page.getByRole('button', {name: 'Sign Up'}).click();

    // Wait for registration form to be fully loaded
    await page.waitForSelector('.signUp-container');
    await page.getByRole('button', {name: '×'}).click();

    // Fill registration form
    const uniqueEmail = `test${Date.now()}@email.com`;
    await page.getByPlaceholder('Enter Username').fill('endtoend');
    await page.getByPlaceholder('Enter Email').fill(uniqueEmail);
    await page.getByPlaceholder('Enter Password').fill('endtoend1');
    await page.getByPlaceholder('Repeat Password').fill('endtoend1');

    // Handle alert dialog for successful registration
    page.once('dialog', (dialog) => dialog.dismiss().catch(() => {}));

    // Force click the register button to bypass overlay
    await page.getByRole('button', {name: 'Register'}).click({force: true});

    // Wait for registration to complete
    await page.waitForTimeout(1000);

    // Login with new account
    await page.getByRole('button', {name: 'Sign In'}).click();
    await page.getByPlaceholder('Email', {exact: true}).fill(uniqueEmail);
    await page.getByPlaceholder('Password', {exact: true}).fill('endtoend1');
    await page.getByRole('button', {name: 'Login'}).click();

    // Verify login successful
    await expect(page.getByRole('button', {name: 'Logout'})).toBeVisible();
  });
});
