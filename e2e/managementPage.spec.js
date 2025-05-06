import {test, expect} from '@playwright/test';

test.describe('Management Page', () => {
  test.beforeEach(async ({page}) => {
    // Start from homepage and login
    await page.goto('http://localhost:5173/');
    await page.getByRole('button', {name: 'Sign In'}).click();
    await page.getByRole('textbox', {name: 'Email'}).fill('admin1@papas.com');
    await page.getByRole('textbox', {name: 'Password'}).fill('firstAdmin');
    await page.getByRole('button', {name: 'Login'}).click();

    // Navigate to management page
    await page.getByRole('link', {name: 'Management Page'}).click();
  });

  test('should display all management sections', async ({page}) => {
    // Check section headers are visible
    await expect(page.getByText('Menu ManagementAdd New')).toBeVisible();
    await expect(page.getByText('Order ManagementPending')).toBeVisible();
    await expect(page.getByText('Review ManagementMenu Item')).toBeVisible();
    await expect(page.getByText('User ManagementRegister New')).toBeVisible();
  });

  test('should have working navigation links', async ({page}) => {
    // Check all navigation links are visible
    const sections = [
      'Menu Management',
      'Order Management',
      'Review Management',
      'User Management',
    ];

    for (const section of sections) {
      const link = page.getByRole('link', {name: section});
      await expect(link).toBeVisible();
      await link.click();
      // Add appropriate assertions for each section's content if needed
    }
  });

  test('should restrict access to non-admin users', async ({page}) => {
    // TODO: Add test for unauthorized access
    // - Logout
    // - Login as regular user
    // - Try to access management page
    // - Verify access is denied
  });
});
