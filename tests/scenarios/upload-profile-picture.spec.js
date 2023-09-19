const { test, expect } = require('@playwright/test');
const { login } = require('../../tests-helpers/login.js');
const { uploadProfilePictureFull } = require('../../tests-helpers/upload-profile-picture.js');

test.describe('Scenario upload a profile picture', () => {
    test('Upload a profile picture', async ({ page }) => {
        await page.goto('https://www.welcometothejungle.com/fr/me/settings/account');
        await page.waitForURL('https://www.welcometothejungle.com/fr/signin');
        await page.getByTestId('login-button-submit').click();
        const spanEmail = await page.locator('span:text("Champ requis")');
        await expect(spanEmail).toHaveCSS('color', 'rgb(175, 70, 54)');
        const spanPassword = await page.locator('span:text("Doit contenir au minimum 8 caractères")');
        await expect(spanPassword).toHaveCSS('color', 'rgb(175, 70, 54)');
        const response = await login(page, process.env.EMAIL, process.env.PASSWORD, true);
        expect(response.status()).toBe(201);
        await page.waitForURL('https://www.welcometothejungle.com/fr/me/settings/account');
        await uploadProfilePictureFull(page, 'fixtures/image.png');
    });
});