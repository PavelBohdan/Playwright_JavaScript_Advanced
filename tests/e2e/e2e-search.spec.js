import { test, expect } from '@playwright/test';

test.describe('Search results', () => {
    test('Should find search results', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
        await page.type('//input[@id="searchTerm"]', 'Banking');
        await page.keyboard.press('Enter');
        await page.waitForLoadState('networkidle');
        const searchResult = await page.getByRole('listitem').filter({ has: page.locator('a') }).allTextContents();
        // console.log(searchResult)
        for (let result of searchResult) {
            expect(result).toContain('Banking');
        };

    });
});