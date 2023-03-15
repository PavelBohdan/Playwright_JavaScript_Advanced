import { test, expect } from '@playwright/test';

test.describe('Login / Logout flow', () => {
    //Before hook
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
    });

    //Negativ scenario
    test('Negativ scenario for login', async ({ page }) => {
        await page.getByRole('button', { name: 'Signin' }).click();
        await page.getByRole('textbox', { name: 'Login' }).type('invalid_test');
        await page.getByRole('textbox', { name: 'Password' }).type('invalid_test');
        await page.getByRole('button', { name: 'Signin' }).click();
        const errorMessage = page.locator('//div[@class="alert alert-error"]')
        await expect(errorMessage).toContainText('Login and/or password are wrong.');
    });

    //Positiv scenario + Logout
    test.only('Positive scenario for login and logout', async ({ page }) => {
        await page.getByRole('button', { name: 'Signin' }).click();
        await page.getByRole('textbox', { name: 'Login' }).type('username');
        await page.getByRole('textbox', { name: 'Password' }).type('password');
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
        const loginName = page.locator('//a[@class="dropdown-toggle"]').nth(1)
        await expect(loginName).toHaveText('username');
        await page.locator('//a[@class="dropdown-toggle"]').nth(1).click();
        await page.locator('//a[@href="/logout.html"]').click();
        const logoutName = page.getByRole('button', { name: 'Signin' });
        await expect(logoutName).toContainText('Signin');
    });


});