import { test, expect } from '@playwright/test';
import { loadHomePage, assertTitle } from './helpers';

test.describe.parallel.only('My first test suit', () => {
    test('Simple basic test', async ({ page }) => {
        //Here goes the test code
        await page.goto('http://example.com/');
        const pageTitle = page.locator('h1');
        await expect(pageTitle).toHaveText('Example Domain');
    });

    test('Clicking on elements', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html');
        await page.click('//button[@id="signin_button"]');
        await page.click('//input[@type="submit"]');
        const errorMessage = page.locator('//div[@class="alert alert-error"]')
        await expect(errorMessage).toHaveText('Login and/or password are wrong.')
    });
});

test('Working with inputs', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html');
    await page.click('//button[@id="signin_button"]');
    await page.type('//input[@id="user_login"]', 'test_user_name');
    await page.type('//input[@id="user_password"]', 'test_password');
    await page.click('//input[@type="submit"]');
    const errorMessage = page.locator('//div[@class="alert alert-error"]');
    await expect(errorMessage).toHaveText('Login and/or password are wrong.');
});

test('Assertions', async ({ page }) => {
    await page.goto('http://example.com/');
    await expect(page).toHaveURL('http://example.com/');
    await expect(page).toHaveTitle('Example Domain');
});

test('Custom Helpers', async ({ page }) => {
    await loadHomePage(page);
    await assertTitle(page);
});