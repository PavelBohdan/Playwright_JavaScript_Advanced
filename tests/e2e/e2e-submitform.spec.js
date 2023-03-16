import { test, expect } from '@playwright/test';

test.describe.only('Feedback form', () => {
    const nameInputField = '//input[@id="name"]';
    const emailInputField = '//input[@id="email"]';
    const subjectInputField = '//input[@id="subject"]';
    const textFields = '//textarea[@id="comment"]';

    const userName = 'TestName';
    const userEmail = 'Test@mail.com';
    const userSubject = 'TestSubject';
    const userText = 'Simple test question?';

    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/');
        await page.click('//li[@id="feedback"]');
        await page.fill(nameInputField, userName);
        await page.fill(emailInputField, userEmail);
        await page.fill(subjectInputField, userSubject);
        await page.fill(textFields, userText);
    });

    // Reset feedback form
    test('Reset feedback form', async ({ page }) => {
        await page.click('//input[@name="clear"]');

        await expect(page.locator(nameInputField)).toBeEmpty();
        await expect(page.locator(emailInputField)).toBeEmpty();
        await expect(page.locator(subjectInputField)).toBeEmpty();
        await expect(page.locator(textFields)).toBeEmpty();

    });

    // Submit feedback form
    test('Submit feedback form', async ({ page }) => {
        await page.click('//input[@name="submit"]');
        const feedbackMessage = page.locator('//div[@class="offset3 span6"]');
        await expect(feedbackMessage).toContainText('Thank you for your comments');
    });
});