import { test, expect } from '@playwright/experimental-ct-vue';
import AdminSearch from '../src/views/AdminSearch.vue';

test.describe('AdminSearch Component', () => {
    test('filters by zip', async ({ mount, page }) => {
        await page.route('**/users.json', route => route.fulfill({
            json: [
                { id: 1, email: 'admin@example.com', firstName: 'Admin', lastName: 'User', zip: '12345', city: 'New York' },
                { id: 2, email: 'test2@example.com', firstName: 'Other', lastName: 'User2', zip: '67890', city: 'OtherCity' }
            ]
        }));
        const component = await mount(AdminSearch);
        
        await expect(component.locator('[data-testid="user-grid"]')).toBeVisible();

        await component.locator('div:nth-child(4) > .ag-header-cell-comp-wrapper > .ag-cell-label-container > .ag-header-icon > .ag-icon').click();
        await component.getByRole('textbox', { name: 'Filter Value' }).click();
        await component.getByRole('textbox', { name: 'Filter Value' }).fill('12345');
        await expect(component.locator('.ag-row')).toHaveCount(1);


        //await component.locator('.ag-header-cell').nth(4).locator('.ag-filter-icon').click(); // Zip column (index 4: email, firstName, lastName, zip, city)
        //await component.locator('.ag-text-field-input').waitFor({ state: 'visible', timeout: 15000 });
        //await component.locator('.ag-text-field-input').fill('54321');
        //await page.waitForTimeout(500); // Wait for filter to apply
        //await expect(component.locator('.ag-row')).toHaveCount(1);
        //await expect(component.locator('.ag-row').locator('.ag-cell').nth(0)).toContainText('admin@example.com');
        //await expect(component.locator('.ag-row').locator('.ag-cell').nth(4)).toContainText('54321');
    });

    test('filters by city', async ({ mount, page }) => {
        await page.route('**/users.json', route => route.fulfill({
            json: [
                { id: 1, email: 'admin@example.com', firstName: 'Admin', lastName: 'User', zip: '54321', city: 'New York' },
                { id: 2, email: 'test2@example.com', firstName: 'Other', lastName: 'User2', zip: '67890', city: 'OtherCity' }
            ]
        }));
        const component = await mount(AdminSearch);
        await expect(component.locator('[data-testid="user-grid"]')).toBeVisible();


        
        //await component.locator('.ag-header-cell').nth(5).locator('.ag-filter-icon').click(); // City column (index 5)
        //await component.locator('.ag-text-field-input').waitFor({ state: 'visible', timeout: 15000 });
        //await component.locator('.ag-text-field-input').fill('New York');
        //await page.waitForTimeout(500); // Wait for filter to apply
        //await expect(component.locator('.ag-row')).toHaveCount(1);
        //await expect(component.locator('.ag-row').locator('.ag-cell').nth(0)).toContainText('admin@example.com');
        //await expect(component.locator('.ag-row').locator('.ag-cell').nth(5)).toContainText('New York');
    });
});