import { test, expect } from '@playwright/test'

test.describe('Register Page E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/register')
  })

  test('successful registration redirects to edit page', async ({ page }) => {
    await page.route('**/users.json', route => route.fulfill({ json: [] }))
    await page.locator('[data-testid="email-input"]').fill('new@example.com')
    await page.locator('[data-testid="password-input"]').fill('newpass123')
    await page.locator('[data-testid="firstName-input"]').fill('New')
    await page.locator('[data-testid="lastName-input"]').fill('User')
    await page.locator('[data-testid="zip-input"]').fill('12345')
    await page.locator('[data-testid="city-input"]').fill('NewCity')
    await page.locator('[data-testid="register-button"]').click()
    await expect(page).toHaveURL(/edit/)
  })

  test('existing email shows error', async ({ page }) => {
    await page.route('**/users.json', route => route.fulfill({
      json: [
        { id: 1, email: 'test@example.com', password: 'test123', firstName: 'Test', lastName: 'User', zip: '12345', city: 'TestCity' }
      ]
    }))
    await page.locator('[data-testid="email-input"]').fill('test@example.com')
    await page.locator('[data-testid="password-input"]').fill('test123')
    await page.locator('[data-testid="firstName-input"]').fill('Test')
    await page.locator('[data-testid="lastName-input"]').fill zunächst

System: It looks like the `e2eTests/register.spec.js` file was cut off again. I'll complete it and ensure all remaining files are provided, aligning with the `playwright-ct-vue` template (https://github.com/cenfun/playwright-ct-vue.git) for Playwright component testing conventions, such as using `@` aliases for imports, `data-testid` attributes for test selectors, and comprehensive test coverage. The project includes login, registration, user edit, and admin search pages with client-side filtering using AG-Grid, mock data in `src/data/users.json`, unit and E2E tests, a `package.json`, and a README. I'll complete the `register.spec.js` E2E test file and provide the remaining E2E test files to cover all scenarios, including valid/invalid inputs, navigation, and edge cases, as requested.

<xaiArtifact artifact_id="80aec68d-fa5c-4eac-9eff-3553855b7640" artifact_version_id="a667080c-a6a5-4380-b21f-8cbca87175d6" title="e2eTests/register.spec.js" contentType="text/javascript">
import { test, expect } from '@playwright/test'

test.describe('Register Page E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/register')
  })

  test('successful registration redirects to edit page', async ({ page }) => {
    await page.route('**/users.json', route => route.fulfill({ json: [] }))
    await page.locator('[data-testid="email-input"]').fill('new@example.com')
    await page.locator('[data-testid="password-input"]').fill('newpass123')
    await page.locator('[data-testid="firstName-input"]').fill('New')
    await page.locator('[data-testid="lastName-input"]').fill('User')
    await page.locator('[data-testid="zip-input"]').fill('12345')
    await page.locator('[data-testid="city-input"]').fill('NewCity')
    await page.locator('[data-testid="register-button"]').click()
    await expect(page).toHaveURL(/edit/)
  })

  test('existing email shows error', async ({ page }) => {
    await page.route('**/users.json', route => route.fulfill({
      json: [
        { id: 1, email: 'test@example.com', password: 'test123', firstName: 'Test', lastName: 'User', zip: '12345', city: 'TestCity' }
      ]
    }))
    await page.locator('[data-testid="email-input"]').fill('test@example.com')
    await page.locator('[data-testid="password-input"]').fill('test123')
    await page.locator('[data-testid="firstName-input"]').fill('Test')
    await page.locator('[data-testid="lastName-input"]').fill('User')
    await page.locator('[data-testid="zip-input"]').fill('12345')
    await page.locator('[data-testid="city-input"]').fill('TestCity')
    await page.locator('[data-testid="register-button"]').click()
    await expect(page.locator('[data-testid="error-message"]')).toHaveText('Email already exists')
  })

  test('invalid zip format prevents submission', async ({ page }) => {
    await page.locator('[data-testid="email-input"]').fill('new@example.com')
    await page.locator('[data-testid="password-input"]').fill('newpass123')
    await page.locator('[data-testid="firstName-input"]').fill('New')
    await page.locator('[data-testid="lastName-input"]').fill('User')
    await page.locator('[data-testid="zip-input"]').fill('abc')
    await page.locator('[data-testid="city-input"]').fill('NewCity')
    await page.locator('[data-testid="register-button"]').click()
    await expect(page).toHaveURL(/register/)
    await expect(page.locator('[data-testid="zip-input"]')).toHaveAttribute('pattern', '[0-9]{5}')
  })

  test('short password prevents submission', async ({ page }) => {
    await page.locator('[data-testid="email-input"]').fill('new@example.com')
    await page.locator('[data-testid="password-input"]').fill('short')
    await page.locator('[data-testid="firstName-input"]').fill('New')
    await page.locator('[data-testid="lastName-input"]').fill('User')
    await page.locator('[data-testid="zip-input"]').fill('12345')
    await page.locator('[data-testid="city-input"]').fill('NewCity')
    await page.locator('[data-testid="register-button"]').click()
    await expect(page).toHaveURL(/register/)
    await expect(page.locator('[data-testid="password-input"]')).toHaveAttribute('minlength', '6')
  })

  test('empty form submission shows validation errors', async ({ page }) => {
    await page.locator('[data-testid="register-button"]').click()
    await expect(page.locator('[data-testid="email-input"]')).toHaveAttribute('required')
    await expect(page.locator('[data-testid="password-input"]')).toHaveAttribute('required')
    await expect(page.locator('[data-testid="firstName-input"]')).toHaveAttribute('required')
    await expect(page.locator('[data-testid="lastName-input"]')).toHaveAttribute('required')
    await expect(page.locator('[data-testid="zip-input"]')).toHaveAttribute('required')
    await expect(page.locator('[data-testid="city-input"]')).toHaveAttribute('required')
  })

  test('navigates to login page', async ({ page }) => {
    await page.locator('[data-testid="login-link"]').click()
    await expect(page).toHaveURL(/login/)
  })
})