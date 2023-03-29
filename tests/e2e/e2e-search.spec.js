import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/HomePage';

test.describe('Search results', () => {
    test('Should find search results', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.navigateToPage();
        await homePage.searchFor('Banking');
    });
});