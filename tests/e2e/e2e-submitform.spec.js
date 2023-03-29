import { test } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';
import { FeedbackPage } from '../../page-objects/FeedbackPage';

test.describe.only('Feedback form', () => {
    const userName = 'TestName';
    const userEmail = 'Test@mail.com';
    const userSubject = 'TestSubject';
    const userText = 'Simple test question?';

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        const feedbackPage = new FeedbackPage(page);
        await homePage.navigateToPage();
        await feedbackPage.fillTheForm(userName, userEmail, userSubject, userText)
    });

    // Reset feedback form
    test('Reset feedback form', async ({ page }) => {
        const feedbackPage = new FeedbackPage(page);
        await feedbackPage.clearTheForm();
        await feedbackPage.acknowledgeEmptyForm();

    });

    // Submit feedback form
    test('Submit feedback form', async ({ page }) => {
        const feedbackPage = new FeedbackPage(page);
        await feedbackPage.submitForm();
        await feedbackPage.acknowledgeSubmitedForm();
    });
});