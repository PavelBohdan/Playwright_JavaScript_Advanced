import { test, expect } from '@playwright/test';

test.describe('Currency', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
        await page.getByRole('button', { name: 'Signin' }).click();
        await page.getByRole('textbox', { name: 'Login' }).type('username');
        await page.getByRole('textbox', { name: 'Password' }).type('password');
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.goto('http://zero.webappsecurity.com/bank/pay-bills.html');
        const loginName = page.locator('//a[@class="dropdown-toggle"]').nth(1);
        await expect(loginName).toHaveText('username');
    });

    test('Currency Exchange', async ({ page }) => {
        await page.click('//a[@href="#ui-tabs-3"]');
        await page.selectOption('//select[@id="pc_currency"]', 'Eurozone (euro)');
        const currencyRate = page.locator('//span[@id="sp_sell_rate"]');
        await expect(currencyRate).toHaveText('1 euro (EUR) = 1.3862 U.S. dollar (USD)');
        await page.type('//input[@id="pc_amount"]', '500');
        await page.click('//input[@id="pc_inDollars_true"]');
        await page.click('//input[@id="pc_calculate_costs"]');
        const conversionAmount = page.locator('//label[@id="pc_conversion_amount"]');
        await expect(conversionAmount).toHaveText('360.70 euro (EUR) = 500.00 U.S. dollar (USD)');
        await page.click('//input[@id="purchase_cash"]');
        const successMessage = page.locator('//div[@id="alert_content"]');
        await expect(successMessage).toHaveText('Foreign currency cash was successfully purchased.')
    });
});