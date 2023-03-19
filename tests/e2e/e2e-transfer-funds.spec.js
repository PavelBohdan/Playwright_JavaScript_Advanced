import { test, expect } from '@playwright/test';

test.describe('Transfer funds test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
        await page.getByRole('button', { name: 'Signin' }).click();
        await page.getByRole('textbox', { name: 'Login' }).type('username');
        await page.getByRole('textbox', { name: 'Password' }).type('password');
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html');
        const loginName = page.locator('//a[@class="dropdown-toggle"]').nth(1);
        await expect(loginName).toHaveText('username');
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