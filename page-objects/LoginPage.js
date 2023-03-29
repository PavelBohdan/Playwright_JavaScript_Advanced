export class LoginPage {
    //Init selectors using constructor
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Login' });
        this.userPasswordInput = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.getByRole('button', { name: 'Sign in' });
    };
};