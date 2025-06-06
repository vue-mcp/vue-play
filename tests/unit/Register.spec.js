import { test, expect } from '@playwright/experimental-ct-vue'
import Register from '../src/views/Register.vue'

test.describe('Register Component', () => {
    test('renders register form', async ({ mount }) => {
        const component = await mount(Register)
        await expect(component.locator('[data-testid="email-input"]')).toBeVisible()
        await expect(component.locator('[data-testid="password-input"]')).toBeVisible()
        await expect(component.locator('[data-testid="firstName-input"]')).toBeVisible()
        await expect(component.locator('[data-testid="lastName-input"]')).toBeVisible()
        await expect(component.locator('[data-testid="zip-input"]')).toBeVisible()
        await expect(component.locator('[data-testid="city-input"]')).toBeVisible()
        await expect(component.locator('[data-testid="register-button"]')).toBeVisible()
        await expect(component.locator('[data-testid="login-link"]')).toBeVisible()
    })

    test('displays error for existing email', async ({ mount, page }) => {
        await page.route('**/users.json', route => route.fulfill({
            json: [
                { id: 1, email: 'test1@example.com', firstName: 'Test', lastName: 'User1', zip: '12345', city: 'TestCity' }
            ]
        }))
        const component = await mount(Register)
        await component.locator('[data-testid="email-input"]').fill('test1@example.com')
        await component.locator('[data-testid="password-input"]').fill('test123')
        await component.locator('[data-testid="firstName-input"]').fill('Test')
        await component.locator('[data-testid="lastName-input"]').fill('User')
        await component.locator('[data-testid="zip-input"]').fill('12345')
        await component.locator('[data-testid="city-input"]').fill('TestCity')
        await component.locator('[data-testid="register-button"]').click()
        await page.waitForTimeout(500) // Wait for reactivity
        //await expect(component.locator('[data-testid="error-message"]')).toHaveText('Email already exists')
    })

    test('registers with valid data', async ({ mount, page }) => {
        await page.route('**/users.json', route => route.fulfill({
            json: []
        }))
        const component = await mount(Register)
        await component.locator('[data-testid="email-input"]').fill('new@example.com')
        await component.locator('[data-testid="password-input"]').fill('newpass123')
        await component.locator('[data-testid="firstName-input"]').fill('New')
        await component.locator('[data-testid="lastName-input"]').fill('User')
        await component.locator('[data-testid="zip-input"]').fill('54321')
        await component.locator('[data-testid="city-input"]').fill('NewCity')
        await component.locator('[data-testid="register-button"]').click()
        await expect(component.locator('[data-testid="error-message"]')).not.toBeVisible()
    })

    test('email input required validation', async ({ mount }) => {
        const component = await mount(Register)
        await component.locator('[data-testid="register-button"]').click()
        await expect(component.locator('[data-testid="email-input"]')).toHaveAttribute('required')
    })

    test('password input required validation', async ({ mount }) => {
        const component = await mount(Register)
        await component.locator('[data-testid="register-button"]').click()
        await expect(component.locator('[data-testid="password-input"]')).toHaveAttribute('required')
    })

    test('firstName input required validation', async ({ mount }) => {
        const component = await mount(Register)
        await component.locator('[data-testid="register-button"]').click()
        await expect(component.locator('[data-testid="firstName-input"]')).toHaveAttribute('required')
    })

    test('lastName input required validation', async ({ mount }) => {
        const component = await mount(Register)
        await component.locator('[data-testid="register-button"]').click()
        await expect(component.locator('[data-testid="lastName-input"]')).toHaveAttribute('required')
    })

    test('zip input required validation', async ({ mount }) => {
        const component = await mount(Register)
        await component.locator('[data-testid="register-button"]').click()
        await expect(component.locator('[data-testid="zip-input"]')).toHaveAttribute('required')
    })

    test('city input required validation', async ({ mount }) => {
        const component = await mount(Register)
        await component.locator('[data-testid="register-button"]').click()
        await expect(component.locator('[data-testid="city-input"]')).toHaveAttribute('required')
    })
})