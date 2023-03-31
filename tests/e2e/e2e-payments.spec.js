import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Payments', () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigateToPage();
        await homePage.login('username', 'password');
        await homePage.navigateToPage('http://zero.webappsecurity.com/bank/pay-bills.html');
        await homePage.assertLogIn('username');
    });

    test('Should send new payment', async ({ page }) => {
        await page.selectOption('//select[@id="sp_payee"]', 'Apple');
        await page.click('//a[@id="sp_get_payee_details"]');
        const appleAccountNumberMessage = page.locator('//i[@id="sp_payee_details"]');
        await expect(appleAccountNumberMessage).toContainText('For 48944145651315 Apple account');
        await page.selectOption('//select[@id="sp_account"]', 'Brokerage');
        await page.type('//input[@id="sp_amount"]', '500');
        await page.type('//input[@id="sp_date"]', '2023-03-14');
        await page.type('//input[@id="sp_description"]', 'Simple description');
        await page.click('//input[@id="pay_saved_payees"]');
        const successMessage = page.locator('//div[@id="alert_content"]');
        await expect(successMessage).toHaveText('The payment was successfully submitted.')
        // await page.pause();
    });
});