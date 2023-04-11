import { test } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe.only('Login / Logout flow', () => {

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigateToPage();
    });

    //Negativ scenario
    test('Negativ scenario for login', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.login('invalid_test', 'invalid_test');
        await homePage.assertErrorMessage();
    });

    //Positiv scenario + Logout
    test('Positive scenario for login and logout', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.login('username', 'password');
        await page.goto('http://zero.webappsecurity.com/bank/account-summary.html');
        await homePage.assertLogIn('username');
        await homePage.logOut();
        await homePage.assertLogOut();
    });


});