import { test, expect } from '@playwright/test';

test.describe('Vue User Management E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/users.json', route => route.fulfill({
      json: [
        { id: 1, email: 'admin@example.com', firstName: 'Admin', lastName: 'User', zip: '54321', city: 'New York', password: 'admin123' },
        { id: 2, email: 'john@example.com', firstName: 'John', lastName: 'Doe', zip: '91788', city: 'ABC', password: 'ssss4444444' },
        { id: 3, email: 'test1@gmail.com', firstName: 'Joe', lastName: 'Doe', zip: '91788', city: 'CA', password: 'ssss' }
      ]
    }));
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/login');
    await page.waitForTimeout(1000);
  });

  test('login with invalid credentials shows error', async ({ page }) => {
    await expect(page.getByTestId('email-input')).toBeVisible();
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input').click();
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input').fill('test1@gmail.com');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('email-input')).toHaveValue('test1@gmail.com');
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input').press('Tab');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('password-input')).toBeFocused();
    await page.waitForTimeout(1000);
    await page.getByTestId('password-input').fill('sss');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('password-input')).toHaveValue('sss');
    await page.waitForTimeout(1000);
    await page.getByTestId('login-button').click();
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('error-message')).toBeVisible();
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('error-message')).toHaveText('Invalid email or password');
    await page.waitForTimeout(1000);
  });

  test('navigate to register page', async ({ page }) => {
    await expect(page.getByTestId('register-link')).toBeVisible();
    await page.waitForTimeout(1000);
    await page.getByTestId('register-link').click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL('http://localhost:5173/register');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('email-input')).toBeVisible();
    await page.waitForTimeout(1000);
  });

  test('register with existing email shows error', async ({ page }) => {
    await page.getByTestId('register-link').click();
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('email-input')).toBeVisible();
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input').click();
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input').fill('test1@gmail.com');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('email-input')).toHaveValue('test1@gmail.com');
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input').press('Tab');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('password-input')).toBeFocused();
    await page.waitForTimeout(1000);
    await page.getByTestId('password-input').fill('ssss');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('password-input')).toHaveValue('ssss');
    await page.waitForTimeout(1000);
    await page.getByTestId('password-input').press('Tab');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('firstName-input')).toBeFocused();
    await page.waitForTimeout(1000);
    await page.getByTestId('firstName-input').fill('ddd');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('firstName-input')).toHaveValue('ddd');
    await page.waitForTimeout(1000);
    await page.getByTestId('firstName-input').press('Tab');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('lastName-input')).toBeFocused();
    await page.waitForTimeout(1000);
    await page.getByTestId('lastName-input').press('Shift+Tab');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('firstName-input')).toBeFocused();
    await page.waitForTimeout(1000);
    await page.getByTestId('firstName-input').fill('Joe');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('firstName-input')).toHaveValue('Joe');
    await page.waitForTimeout(1000);
    await page.getByTestId('firstName-input').press('Tab');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('lastName-input')).toBeFocused();
    await page.waitForTimeout(1000);
    await page.getByTestId('lastName-input').fill('Doe');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('lastName-input')).toHaveValue('Doe');
    await page.waitForTimeout(1000);
    await page.getByTestId('lastName-input').press('Tab');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('zip-input')).toBeFocused();
    await page.waitForTimeout(1000);
    await page.getByTestId('zip-input').fill('91788');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('zip-input')).toHaveValue('91788');
    await page.waitForTimeout(1000);
    await page.getByTestId('zip-input').press('Tab');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('city-input')).toBeFocused();
    await page.waitForTimeout(1000);
    await page.getByTestId('city-input').fill('CA');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('city-input')).toHaveValue('CA');
    await page.waitForTimeout(1000);
    await page.getByTestId('register-button').click();
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('error-message')).toBeVisible();
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('error-message')).toHaveText('Email already exists');
    await page.waitForTimeout(1000);
  });

  test('register retry with updated password fails', async ({ page }) => {
    await page.getByTestId('register-link').click();
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input').fill('test1@gmail.com');
    await page.waitForTimeout(1000);
    await page.getByTestId('password-input').fill('ssss');
    await page.waitForTimeout(1000);
    await page.getByTestId('firstName-input').fill('Joe');
    await page.waitForTimeout(1000);
    await page.getByTestId('lastName-input').fill('Doe');
    await page.waitForTimeout(1000);
    await page.getByTestId('zip-input').fill('91788');
    await page.waitForTimeout(1000);
    await page.getByTestId('city-input').fill('CA');
    await page.waitForTimeout(1000);
    await page.getByTestId('register-button').click();
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('error-message')).toHaveText('Email already exists');
    await page.waitForTimeout(1000);
    await page.getByTestId('password-input').click();
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('password-input')).toBeFocused();
    await page.waitForTimeout(1000);
    await page.getByTestId('password-input').fill('ssss4444444');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('password-input')).toHaveValue('ssss4444444');
    await page.waitForTimeout(1000);
    await page.getByTestId('register-button').click();
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('error-message')).toBeVisible();
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('error-message')).toHaveText('Email already exists');
    await page.waitForTimeout(1000);
  });

  test('update user first name to Joe 2', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input').fill('test1@gmail.com');
    await page.waitForTimeout(1000);
    await page.getByTestId('password-input').fill('ssss');
    await page.waitForTimeout(1000);
    await page.getByTestId('login-button').click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL('http://localhost:5173/user');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('firstName-input')).toBeVisible();
    await page.waitForTimeout(1000);
    await page.getByTestId('firstName-input').click();
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('firstName-input')).toBeFocused();
    await page.waitForTimeout(1000);
    await page.getByTestId('firstName-input').fill('Joe 2');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('firstName-input')).toHaveValue('Joe 2');
    await page.waitForTimeout(1000);
    await page.getByTestId('update-button').click();
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('firstName-input')).toHaveValue('Joe 2');
    await page.waitForTimeout(1000);
  });

  test('update user first name to Joe 4', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input').fill('test1@gmail.com');
    await page.waitForTimeout(1000);
    await page.getByTestId('password-input').fill('ssss');
    await page.waitForTimeout(1000);
    await page.getByTestId('login-button').click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL('http://localhost:5173/user');
    await page.waitForTimeout(1000);
    await page.getByTestId('firstName-input').click();
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('firstName-input')).toBeFocused();
    await page.waitForTimeout(1000);
    await page.getByTestId('firstName-input').fill('Joe 4');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('firstName-input')).toHaveValue('Joe 4');
    await page.waitForTimeout(1000);
    await page.getByTestId('update-button').click();
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('firstName-input')).toHaveValue('Joe 4');
    await page.waitForTimeout(1000);
  });

  test('filter admin grid by first name john', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.waitForTimeout(1000);
    await page.getByTestId('password-input').fill('admin123');
    await page.waitForTimeout(1000);
    await page.getByTestId('login-button').click();
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/admin');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('user-grid')).toBeVisible();
    await page.waitForTimeout(1000);
    await page.locator('.ag-header-cell:nth-child(3) .ag-filter-icon').click(); // FirstName column
    await page.waitForTimeout(1000);
    await expect(page.locator('.ag-text-field-input')).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(1000);
    await page.locator('.ag-text-field-input').fill('john');
    await page.waitForTimeout(1000);
    await expect(page.locator('.ag-text-field-input')).toHaveValue('john');
    await page.waitForTimeout(1000);
    await page.waitForTimeout(500); // Existing filter wait
    await page.waitForTimeout(1000);
    await expect(page.locator('.ag-row')).toHaveCount(1);
    await page.waitForTimeout(1000);
    await expect(page.locator('.ag-row .ag-cell:nth-child(1)')).toContainText('john@example.com');
    await page.waitForTimeout(1000);
  });

  test('filter admin grid by email ssss', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.waitForTimeout(1000);
    await page.getByTestId('password-input').fill('admin123');
    await page.waitForTimeout(1000);
    await page.getByTestId('login-button').click();
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/admin');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('user-grid')).toBeVisible();
    await page.waitForTimeout(1000);
    await page.locator('.ag-header-cell:nth-child(2) .ag-filter-icon').click(); // Email column
    await page.waitForTimeout(1000);
    await expect(page.locator('.ag-text-field-input')).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(1000);
    await page.locator('.ag-text-field-input').fill('ssss');
    await page.waitForTimeout(1000);
    await expect(page.locator('.ag-text-field-input')).toHaveValue('ssss');
    await page.waitForTimeout(1000);
    await page.waitForTimeout(500); // Existing filter wait
    await page.waitForTimeout(1000);
    await expect(page.locator('.ag-row')).toHaveCount(1);
    await page.waitForTimeout(1000);
    await expect(page.locator('.ag-row .ag-cell:nth-child(1)')).toContainText('john@example.com');
    await page.waitForTimeout(1000);
  });

  test('filter admin grid by city ABC', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.waitForTimeout(1000);
    await page.getByTestId('email-input').fill('admin@example.com');
    await page.waitForTimeout(1000);
    await page.getByTestId('password-input').fill('admin123');
    await page.waitForTimeout(1000);
    await page.getByTestId('login-button').click();
    await page.waitForTimeout(1000);
    await page.goto('http://localhost:5173/admin');
    await page.waitForTimeout(1000);
    await expect(page.getByTestId('user-grid')).toBeVisible();
    await page.waitForTimeout(1000);
    await page.locator('.ag-header-cell:nth-child(6) .ag-filter-icon').click(); // City column
    await page.waitForTimeout(1000);
    await expect(page.locator('.ag-text-field-input')).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(1000);
    await page.locator('.ag-text-field-input').fill('ABC');
    await page.waitForTimeout(1000);
    await expect(page.locator('.ag-text-field-input')).toHaveValue('ABC');
    await page.waitForTimeout(1000);
    await page.waitForTimeout(500); // Existing filter wait
    await page.waitForTimeout(1000);
    await expect(page.locator('.ag-row')).toHaveCount(1);
    await page.waitForTimeout(1000);
    await expect(page.locator('.ag-row .ag-cell:nth-child(1)')).toContainText('john@example.com');
    await page.waitForTimeout(1000);
  });
});