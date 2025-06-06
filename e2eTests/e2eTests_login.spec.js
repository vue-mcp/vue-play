import { test, expect } from '@playwright/test'

test.describe('Login Page E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login')
  })

  test('successful login redirects to edit page', async ({ page }) => {
    await page.route('**/users.json', route => route.fulfill({
      json: [
        { id: 1, email: 'test@example.com', password: 'test123', firstName: 'Test', lastName: 'User', zip: '12345', city: 'TestCity' }
      ]
    }))
    await page.locator('[data-testid="email-input"]').fill('test@example.com')
    await page.locator('[data-testid="password-input"]').fill('test123')
    await page.locator('[data-testid="login-button"]').click()
    await expect(page).toHaveURL(/edit/)
  })

  test('admin login redirects to admin page', async ({ page }) => {
    await page.route('**/users.json', route => route.fulfill({
      json: [
        { id: 1, email: 'admin@example.com', password: 'admin123', firstName: 'Admin', lastName: 'User', zip: '12345', city: 'New York' }
      ]
    }))
    await page.locator('[data-testid="email-input"]').fill('admin@example.com')
    await page.locator('[data-testid="password-input"]').fill('admin123')
    await page.locator('[data-testid="login-button"]').click()
    await expect(page).toHaveURL(/admin/)
  })

  test('invalid login shows error', async ({ page }) => {
    await page.locator('[data-testid="email-input"]').fill('wrong@example.com')
    await page.locator('[data-testid="password-input"]').fill('wrongpass')
    await page.locator('[data-testid="login-button"]').click()
    await expect(page.locator('[data-testid="error-message"]')).toHaveText('Invalid email or password')
  })

  test('navigates to register page', async ({ page }) => {
    await page.locator('[data-testid="register-link"]').click()
    await expect(page).toHaveURL(/register/)
  })

  test('empty form submission shows validation errors', async ({ page }) => {
    await page.locator('[data-testid="login-button"]').click()
    await expect(page.locator('[data-testid="email-input"]')).toHaveAttribute('required')
    await expect(page.locator('[data-testid="password-input"]')).toHaveAttribute('required')
  })
})