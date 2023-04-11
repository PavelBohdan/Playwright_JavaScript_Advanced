import { expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { AbstractPage } from './AbstractPage';

export class HomePage extends AbstractPage {

    //Init selectors using constructor
    constructor(page) {
        super(page);
        this.signInButton = page.getByRole('button', { name: 'Signin' });
        this.errorMessage = page.locator('//div[@class="alert alert-error"]');
        this.loginName = page.locator('//a[@class="dropdown-toggle"]').nth(1);
        this.usernameDropdownButton = page.locator('//a[@class="dropdown-toggle"]').nth(1);
        this.logoutButton = page.locator('//a[@href="/logout.html"]');
        this.logoutName = page.getByRole('button', { name: 'Signin' });
        this.searchField = page.locator('//input[@id="searchTerm"]');
        this.searchResultLocator = page.getByRole('listitem').filter({ has: page.locator('a') });
        this.loginForm = page.locator('//div[@class="offset3 span6"]');
        this.errorMessage = page.locator('//div[@class="alert alert-error"]');
    };

    async snapshotLoginForm() {
        expect(await this.loginForm.screenshot()).toMatchSnapshot('login-form.png');
    };

    async snapshotErrorMessage() {
        expect(await this.errorMessage.screenshot()).toMatchSnapshot('login-error.png');
    };

    //Define home page methods
    async navigateToPage(url = 'http://zero.webappsecurity.com/') {
        await this.page.goto(url);
    };

    async login(username, password) {
        await this.signInButton.click();
        await this.snapshotLoginForm()
        const loginPage = new LoginPage(this.page);
        await loginPage.usernameInput.type(username);
        await loginPage.userPasswordInput.type(password);
        await loginPage.submitButton.click();
    };

    async logOut() {
        await this.usernameDropdownButton.click();
        await this.logoutButton.click();
    };

    async assertLogIn(username) {
        await expect(this.loginName).toHaveText(username)
    };

    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText('Login and/or password are wrong.');
        await this.snapshotErrorMessage();
    };

    async assertLogOut() {
        await expect(this.logoutName).toContainText('Signin');
    };

    async searchFor(phrase) {
        await this.searchField.type(phrase)
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('networkidle');
        const searchResult = await this.searchResultLocator.allTextContents()
        for (let result of searchResult) {
            expect(result).toContain(phrase);
        };
    };
};