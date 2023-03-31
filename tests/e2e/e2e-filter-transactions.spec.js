import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Filter transaction', () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigateToPage();
        await homePage.login('username', 'password');
        await homePage.navigateToPage('http://zero.webappsecurity.com/bank/account-activity.html');
        await homePage.assertLogIn('username'); 
    });

    test('Filter account by "Checking"', async ({ page }) => {
        await page.selectOption('//select[@id="aa_accountId"]', 'Checking');
        await page.waitForLoadState('networkidle');
        const filterResults = await page.getByRole('row').allInnerTexts();
        let result = [];
        for (let row of filterResults) {
            if (row.includes('2012-09-06')) {
                result.push(row);
            };
        };
        expect(result).toContain('2012-09-06\tCHECK DEPOSIT\t186.7\t');
    });

    test('Filter account by "Brokerage" and check that it is empty', async ({ page }) => {
        await page.selectOption('//select[@id="aa_accountId"]', 'Brokerage');
        await page.waitForLoadState('networkidle');
        const filterResults = await page.getByRole('row').allInnerTexts();
        expect(filterResults).toHaveLength(0);
    });

});