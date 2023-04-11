import { test, expect } from '@playwright/test'

test.describe('Visual regression test example', () => {
    test("full Page Snapshot", async ({ page }) => {
        await page.goto('http://example.com/');
        expect(await page.screenshot()).toMatchSnapshot('homepage.png');
    });
    test("Single Element Snapshot", async ({ page }) => {
        await page.goto('http://example.com/');
        const pageElement = page.locator('//h1');
        expect(await pageElement.screenshot()).toMatchSnapshot('pageTitle.png');
    });
});