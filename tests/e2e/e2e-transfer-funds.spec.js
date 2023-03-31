import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Transfer funds test', () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigateToPage();
        await homePage.login('username', 'password');
        await homePage.navigateToPage('http://zero.webappsecurity.com/bank/transfer-funds.html');
        await homePage.assertLogIn('username');
    });

    test('Transfer funds', async ({ page }) => {
        await page.selectOption('//select[@id="tf_fromAccountId"]', '2');
        await page.selectOption('//select[@id="tf_toAccountId"]', '3');
        await page.type('//input[@id="tf_amount"]', '500');
        await page.type('//input[@id="tf_description"]', 'Simple description');
        await page.click('//button[@id="btn_submit"]');
        const verifyMessage = page.locator('//h2[@class="board-header"]');
        await expect(verifyMessage).toHaveText('Transfer Money & Make Payments - Verify');
        await page.click('//button[@id="btn_submit"]');
        const confirmMessage = page.locator('//div[@class="alert alert-success"]');
        await expect(confirmMessage).toHaveText('You successfully submitted your transaction.');
    });
});