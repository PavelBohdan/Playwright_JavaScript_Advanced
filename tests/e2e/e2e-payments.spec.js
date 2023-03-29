import { test, expect } from '@playwright/test';

test.describe('Payments', () => {
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