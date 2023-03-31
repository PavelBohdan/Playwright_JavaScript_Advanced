import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { PaymentPage } from '../../page-objects/PaymentPage';

test.describe('Payments', () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigateToPage();
        await homePage.login('username', 'password');
        await homePage.navigateToPage('http://zero.webappsecurity.com/bank/pay-bills.html');
        await homePage.assertLogIn('username');
    });

    test('Should send new payment', async ({ page }) => {
        const paymentPage = new PaymentPage(page);
        await paymentPage.payee.selectOption('Apple');
        await paymentPage.payeeDetailsButton.click();
        await expect(paymentPage.appleAccountNumberMessage).toContainText('For 48944145651315 Apple account');
        await paymentPage.account.selectOption('Brokerage');
        await paymentPage.amount.type('500');
        await paymentPage.date.type('2023-03-14');
        await paymentPage.description.type('Simple description');
        await paymentPage.saveButton.click();
        await expect(paymentPage.successMessage).toHaveText('The payment was successfully submitted.');
    });
});