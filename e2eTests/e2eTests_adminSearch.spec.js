import { test, expect } from '@playwright/test'

test.describe('AdminSearch Page E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        email: 'admin@example.com',
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        zip: '12345',
        city: 'New York'
      }))
    })
    await page.goto('http://localhost:5173/admin')
  })

  test('displays user grid', async ({ page }) => {
    await page.route('**/users.json', route => route.fulfill({
      json: [
        { id: 1, email: 'test1@example.com', firstName: 'Test', lastName: 'User1', zip: '12345', city: 'TestCity' },
        { id: 2, email: 'test2@example.com', firstName: 'Other', lastName: 'User2', zip: '67890', city: 'OtherCity' }
      ]
    }))
    await expect(page.locator('[data-testid="user-grid"]')).toBeVisible()
    await expect(page.locator('.ag-row')).toHaveCount(2)
  })

  test('filters by first name', async ({ page }) => {
    await page.route('**/users.json', route => route.fulfill({
      json: [
        { id: 1, email: 'test1@example.com', firstName: 'Test', lastName: 'User1', zip: '12345', city: 'TestCity' },
        { id: 2, email: 'test2@example.com', firstName: 'Other', lastName: 'User2', zip: '67890', city: 'OtherCity' }
      ]
    }))
    await page.locator('.ag-header-cell').first().click()
    await page.locator('.ag-filter input').fill('Test')
    await expect(page.locator('.ag-row')).toHaveCount(1)
    await expect(page.locator('.ag-row').locator('.ag-cell').first()).toContainText('Test')
  })

  test('filters by last name', async ({ page }) => {
    await page.route('**/users.json', route => route.fulfill({
      json: [
        { id: 1, email: 'test1@example.com', firstName: 'Test', lastName: 'User1', zip: '12345', city: 'TestCity' },
        { id: 2, email: 'test2@example.com', firstName: 'Other', lastName: 'User2', zip: '67890', city: 'OtherCity' }
      ]
    }))
    await page.locator('.ag-header-cell').nth(1).click()
    await page.locator('.ag-filter input').fill('User1')
    await expect(page.locator('.ag-row')).toHaveCount(1)
    await expect(page.locator('.ag-row').locator('.ag-cell').nth(1)).toContainText('User1')
  })

  test('filters by zip', async ({ page }) => {
    await page.route('**/users.json', route => route.fulfill({
      json: [
        { id: 1, email: 'test1@example.com', firstName: 'Test', lastName: 'User1', zip: '12345', city: 'TestCity' },
        { id: 2, email: 'test2@example.com', firstName: 'Other', lastName: 'User2', zip: '67890', city: 'OtherCity' }
      ]
    }))
    await page.locator('.ag-header-cell').nth(3).click()
    await page.locator('.ag-filter input').fill('12345')
    await expect(page.locator('.ag-row')).toHaveCount(1)
    await expect(page.locator('.ag-row').locator('.ag-cell').nth(3)).toContainText('12345')
  })

  test('filters by city', async ({ page }) => {
    await page.route('**/users.json', route => route.fulfill({
      json: [
        { id: 1, email: 'test1@example.com', firstName: 'Test', lastName: 'User1', zip: '12345', city: 'TestCity' },
        { id: 2, email: 'test2@example.com', firstName: 'Other', lastName: 'User2', zip: '67890', city: 'OtherCity' }
      ]
    }))
    await page.locator('.ag-header-cell').nth(4).click()
    await page.locator('.ag-filter input').fill('TestCity')
    await expect(page.locator('.ag-row')).toHaveCount(1)
    await expect(page.locator('.ag-row').locator('.ag-cell').nth(4)).toContainText('TestCity')
  })

  test('no results for invalid filter', async ({ page }) => {
    await page.route('**/users.json', route => route.fulfill({
      json: [
        { id: 1, email: 'test1@example.com', firstName: 'Test', lastName: 'User1', zip: '12345', city: 'TestCity' }
      ]
    }))
    await page.locator('.ag-header-cell').first().click()
    await page.locator('.ag-filter input').fill('Nonexistent')
    await expect(page.locator('.ag-row')).toHaveCount(0)
  })

  test('non-admin user redirects to login', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('user', JSON.stringify({
        id: 2,
        email: 'test@example.com',
        password: 'test123',
        firstName: 'Test',
        lastName: 'User',
        zip: '12345',
        city: 'TestCity'
      }))
    })
    await page.goto('http://localhost:5173/admin')
    await expect(page).toHaveURL(/login/)
  })

  test('unauthenticated user redirects to login', async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('user'))
    await page.goto('http://localhost:5173/admin')
    await expect(page).toHaveURL(/login/)
  })
})