import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Currency', () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigateToPage();
        await homePage.login('username', 'password');
        await homePage.navigateToPage('http://zero.webappsecurity.com/bank/pay-bills.html');
        await homePage.assertLogIn('username');
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