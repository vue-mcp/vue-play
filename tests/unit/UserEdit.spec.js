import { test, expect } from '@playwright/experimental-ct-vue'
import UserEdit from '../src/views/UserEdit.vue'

test.describe('UserEdit Component', () => {
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
  })

  test('renders edit form with user data', async ({ mount }) => {
    const component = await mount(UserEdit)
    await expect(component.locator('h2')).toHaveText('Edit Profile')
    await expect(component.locator('[data-testid="email-input"]')).toHaveValue('test@example.com')
    await expect(component.locator('[data-testid="email-input"]')).toBeDisabled()
    await expect(component.locator('[data-testid="password-input"]')).toHaveValue('test123')
    await expect(component.locator('[data-testid="firstName-input"]')).toHaveValue('Test')
    await expect(component.locator('[data-testid="lastName-input"]')).toHaveValue('User')
    await expect(component.locator('[data-testid="zip-input"]')).toHaveValue('12345')
    await expect(component.locator('[data-testid="city-input"]')).toHaveValue('TestCity')
  })

  test('updates user data', async ({ mount, page }) => {
    await page.route('**/users.json', route => route.fulfill({
      json: [
        { id: 1, email: 'test@example.com', password: 'test123', firstName: 'Test', lastName: 'User', zip: '12345', city: 'TestCity' }
      ]
    }))
    const component = await mount(UserEdit)
    await component.locator('[data-testid="firstName-input"]').fill('Updated')
    await component.locator('[data-testid="lastName-input"]').fill('UpdatedUser')
    await component.locator('[data-testid="zip-input"]').fill('67890')
    await component.locator('[data-testid="city-input"]').fill('UpdatedCity')
    await component.locator('[data-testid="update-button"]').click()
    await expect(component.locator('[data-testid="success-message"]')).toHaveText('Profile updated successfully')
  })

  test('validates password length', async ({ mount }) => {
    const component = await mount(UserEdit)
    await component.locator('[data-testid="password-input"]').fill('short')
    await component.locator('[data-testid="update-button"]').click()
    await expect(component.locator('[data-testid="password-input"]')).toHaveAttribute('minlength', '6')
  })

  test('validates zip format', async ({ mount }) => {
    const component = await mount(UserEdit)
    await component.locator('[data-testid="zip-input"]').fill('abc')
    await component.locator('[data-testid="update-button"]').click()
    await expect(component.locator('[data-testid="zip-input"]')).toHaveAttribute('pattern', '[0-9]{5}')
  })

  test('requires all fields', async ({ mount }) => {
    const component = await mount(UserEdit)
    await component.locator('[data-testid="password-input"]').fill('')
    await component.locator('[data-testid="firstName-input"]').fill('')
    await component.locator('[data-testid="lastName-input"]').fill('')
    await component.locator('[data-testid="zip-input"]').fill('')
    await component.locator('[data-testid="city-input"]').fill('')
    await component.locator('[data-testid="update-button"]').click()
    await expect(component.locator('[data-testid="password-input"]')).toHaveAttribute('required')
    await expect(component.locator('[data-testid="firstName-input"]')).toHaveAttribute('required')
    await expect(component.locator('[data-testid="lastName-input"]')).toHaveAttribute('required')
    await expect(component.locator('[data-testid="zip-input"]')).toHaveAttribute('required')
    await expect(component.locator('[data-testid="city-input"]')).toHaveAttribute('required')
  })
})