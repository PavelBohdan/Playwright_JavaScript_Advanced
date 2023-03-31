import { AbstractPage } from "./AbstractPage";

export class LoginPage extends AbstractPage {
    //Init selectors using constructor
    constructor(page) {
        super(page);
        this.usernameInput = page.getByRole('textbox', { name: 'Login' });
        this.userPasswordInput = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.getByRole('button', { name: 'Sign in' });
    };
};