export class PaymentPage {
    constructor(page) {
        this.page = page;
        this.payee = page.locator('//select[@id="sp_payee"]');
        this.payeeDetailsButton = page.locator('//a[@id="sp_get_payee_details"]');
        this.appleAccountNumberMessage = page.locator('//i[@id="sp_payee_details"]');
        this.account = page.locator('//select[@id="sp_account"]');
        this.amount = page.locator('//input[@id="sp_amount"]');
        this.date = page.locator('//input[@id="sp_date"]');
        this.description = page.locator('//input[@id="sp_description"]');
        this.saveButton = page.locator('//input[@id="pay_saved_payees"]');
        this.successMessage = page.locator('//div[@id="alert_content"]');
    };
};