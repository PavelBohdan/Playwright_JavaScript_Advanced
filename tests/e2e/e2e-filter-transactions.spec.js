import { test, expect } from '@playwright/test';

test.describe('Filter transaction', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
        await page.getByRole('button', { name: 'Signin' }).click();
        await page.getByRole('textbox', { name: 'Login' }).type('username');
        await page.getByRole('textbox', { name: 'Password' }).type('password');
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.goto('http://zero.webappsecurity.com/bank/account-activity.html');
        const loginName = page.locator('//a[@class="dropdown-toggle"]').nth(1);
        await expect(loginName).toHaveText('username');
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