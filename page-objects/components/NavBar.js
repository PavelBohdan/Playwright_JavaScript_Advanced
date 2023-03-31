export class NavBar {
    constructor(page) {
        this.page = page;
        this.accountSummary = page.locator('//a[@href="/bank/redirect.html?url=account-summary.html"]');
        this.accountActivity = page.locator('//a[@href="/bank/redirect.html?url=account-activity.html"]');
        this.transferFunds = page.locator('//a[@href="/bank/redirect.html?url=transfer-funds.html"]');
        this.payBills = page.locator('//a[@href="/bank/redirect.html?url=pay-bills.html"]');
        this.myMoneyMap = page.locator('//a[@href="/bank/redirect.html?url=money-map.html"]');
        this.onlineStatements = page.locator('//a[@href="/bank/redirect.html?url=online-statements.html"]');
    };

    async clickOnTab(tabName) {
        switch (tabName) {
            case 'Account Summary':
                await this.accountSummary.click();
                break
            case 'Account Activity':
                await this.accountActivity.click();
                break
            case 'Transfer Funds':
                await this.transferFunds.click();
                break
            case 'Pay Bills':
                await this.payBills.click();
                break
            case 'My Money Map':
                await this.myMoneyMap.click();
                break
            case 'Online Statements':
                await this.onlineStatements.click();
                break
            default:
                throw new Error('This Tab does not exist!')
        };
    };
};