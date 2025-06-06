import { test, expect } from '@playwright/test'

test.describe('UserEdit Page E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        email: 'test@example.com',
        password: 'test123',
        firstName: 'Test',
        lastName: 'User',
        zip: '12345',
        city: 'TestCity'
      }))
    })
    await page.goto('http://localhost:5173/edit')
  })

  test('updates user profile successfully', async ({ page }) => {
    await page.route('**/users.json', route => route.fulfill({
      json: [
        { id: 1, email: 'test@example.com', password: 'test123', firstName: 'Test', lastName: 'User', zip: '12345', city: 'TestCity' }
      ]
    }))
    await page.locator('[data-testid="firstName-input"]').fill('Updated')
    await page.locator('[data-testid="lastName-input"]').fill('UpdatedUser')
    await page.locator('[data-testid="zip-input"]').fill('67890')
    await page.locator('[data-testid="city-input"]').fill('UpdatedCity')
    await page.locator('[data-testid="update-button"]').click()
    await expect(page.locator('[data-testid="success-message"]')).toHaveText('Profile updated successfully')
  })

  test('email field is disabled', async ({ page }) => {
    await expect(page.locator('[data-testid="email-input"]')).toBeDisabled()
  })

  test('invalid zip format prevents submission', async ({ page }) => {
    await page.locator('[data-testid="zip-input"]').fill('abc')
    await page.locator('[data-testid="update-button"]').click()
    await expect(page.locator('[data-testid="zip-input"]')).toHaveAttribute('pattern', '[0-9]{5}')
    await expect(page.locator('[data-testid="success-message"]')).not.toBeVisible()
  })

  test('short password prevents submission', async ({ page }) => {
    await page.locator('[data-testid="password-input"]').fill('short')
    await page.locator('[data-testid="update-button"]').click()
    await expect(page.locator('[data-testid="password-input"]')).toHaveAttribute('minlength', '6')
    await expect(page.locator('[data-testid="success-message"]')).not.toBeVisible()
  })

  test('empty required fields prevent submission', async ({ page }) => {
    await page.locator('[data-testid="password-input"]').fill('')
    await page.locator('[data-testid="firstName-input"]').fill('')
    await page.locator('[data-testid="lastName-input"]').fill('')
    await page.locator('[data-testid="zip-input"]').fill('')
    await page.locator('[data-testid="city-input"]').fill('')
    await page.locator('[data-testid="update-button"]').click()
    await expect(page.locator('[data-testid="password-input"]')).toHaveAttribute('required')
    await expect(page.locator('[data-testid="firstName-input"]')).toHaveAttribute('required')
    await expect(page.locator('[data-testid="lastName-input"]')).toHaveAttribute('required')
    await expect(page.locator('[data-testid="zip-input"]')).toHaveAttribute('required')
    await expect(page.locator('[data-testid="city-input"]')).toHaveAttribute('required')
    await expect(page.locator('[data-testid="success-message"]')).not.toBeVisible()
  })

  test('unauthenticated user redirects to login', async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('user'))
    await page.goto('http://localhost:5173/edit')
    await expect(page).toHaveURL(/login/)
  })
})