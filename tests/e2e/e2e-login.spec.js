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
        await page.getByRole('button', { name: 'Sign in' }).click();
        const errorMessage = page.locator('//div[@class="alert alert-error"]')
        await expect(errorMessage).toContainText('Login and/or password are wrong.');
    });

    //Positiv scenario + Logout
    test('Positive scenario for login and logout', async ({ page }) => {
        await page.getByRole('button', { name: 'Signin' }).click();
        await page.getByRole('textbox', { name: 'Login' }).type('username');
        await page.getByRole('textbox', { name: 'Password' }).type('password');
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.goBack();
        const loginName = page.locator('//a[@class="dropdown-toggle"]').nth(1)
        await expect(loginName).toHaveText('username')
    });


});