import { test, expect } from '@playwright/experimental-ct-vue'
import Login from '../src/views/Login.vue'

test.describe('Login Component', () => {
    test('renders login form', async ({ mount }) => {
        const component = await mount(Login)
        await expect(component.locator('[data-testid="email-input"]')).toBeVisible()
        await expect(component.locator('[data-testid="password-input"]')).toBeVisible()
        await expect(component.locator('[data-testid="login-button"]')).toBeVisible()
        await expect(component.locator('[data-testid="register-link"]')).toBeVisible()
    })

    test('logs in with valid credentials', async ({ mount, page }) => {
        await page.route('**/users.json', route => route.fulfill({
            json: [
                { id: 1, email: 'test@example.com', password: 'test123', firstName: 'Test', lastName: 'User', zip: '12345', city: 'TestCity' }
            ]
        }))
        const component = await mount(Login)
        await component.locator('[data-testid="email-input"]').fill('test@example.com')
        await component.locator('[data-testid="password-input"]').fill('test123')
        await component.locator('[data-testid="login-button"]').click()
        await expect(component.locator('[data-testid="error-message"]')).not.toBeVisible()
    })

    test('navigates to register page', async ({ mount }) => {
        const component = await mount(Login)
        await expect(component.locator('[data-testid="register-link"]')).toHaveText('Register')
       // await expect(component.locator('[data-testid="register-link"] a')).toHaveAttribute('href', '/register')
    })

    test('email input required validation', async ({ mount }) => {
        const component = await mount(Login)
        await component.locator('[data-testid="login-button"]').click()
        await expect(component.locator('[data-testid="email-input"]')).toHaveAttribute('required')
    })

    test('password input required validation', async ({ mount }) => {
        const component = await mount(Login)
        await component.locator('[data-testid="login-button"]').click()
        await expect(component.locator('[data-testid="password-input"]')).toHaveAttribute('required')
    })

    test('displays error for invalid credentials', async ({ mount, page }) => {
        await page.route('**/users.json', route => route.fulfill({
            json: [
                { id: 1, email: 'test@example.com', password: 'test123', firstName: 'Test', lastName: 'User', zip: '12345', city: 'TestCity' }
            ]
        }))
        const component = await mount(Login)
        await component.locator('[data-testid="email-input"]').fill('wrong@example.com')
        await component.locator('[data-testid="password-input"]').fill('wrongpass')
        await component.locator('[data-testid="login-button"]').click()
        await expect(component.locator('[data-testid="error-message"]')).toHaveText('Invalid email or password')
    })
})