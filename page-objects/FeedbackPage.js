import { expect } from '@playwright/test';

export class FeedbackPage {
    constructor(page) {
        this.page = page;
        this.nameInputField = page.locator('//input[@id="name"]');
        this.emailInputField = page.locator('//input[@id="email"]');
        this.subjectInputField = page.locator('//input[@id="subject"]');
        this.textFields = page.locator('//textarea[@id="comment"]');
        this.feedbackButton = page.locator('//li[@id="feedback"]');
        this.clearButton = page.locator('//input[@name="clear"]');
        this.submitButton = page.locator('//input[@name="submit"]');
        this.feedbackMessage = page.locator('//div[@class="offset3 span6"]');

    };

    async fillForm(userName, userEmail, userSubject, userText) {
        await this.feedbackButton.click();
        await this.nameInputField.fill(userName);
        await this.emailInputField.fill(userEmail);
        await this.subjectInputField.fill(userSubject);
        await this.textFields.fill(userText);
    };

    async clearForm() {
        await this.clearButton.click();
    };

    async submitForm() {
        await this.submitButton.click();
    };

    async acknowledgeEmptyForm() {
        await expect(this.nameInputField).toBeEmpty();
        await expect(this.emailInputField).toBeEmpty();
        await expect(this.subjectInputField).toBeEmpty();
        await expect(this.textFields).toBeEmpty();
    };

    async acknowledgeSubmitedForm() {
        await expect(this.feedbackMessage).toContainText('Thank you for your comments');
    };
};
