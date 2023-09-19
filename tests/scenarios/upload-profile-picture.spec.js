const { test, expect } = require('@playwright/test');
const { login, loginWithNoCredentials } = require('../../tests-helpers/login.js');
const { uploadProfilePictureFull } = require('../../tests-helpers/upload-profile-picture.js');

test.describe('Scenario upload a profile picture', () => {
    test('Upload a profile picture', async ({ page }) => {
        await page.goto('https://www.welcometothejungle.com/fr/me/settings/account');
        await page.waitForURL('https://www.welcometothejungle.com/fr/signin');
        await page.getByTestId('login-button-submit').click();
        await loginWithNoCredentials(page);
        const response = await login(page, process.env.EMAIL, process.env.PASSWORD, true);
        expect(response.status()).toBe(201);
        await page.waitForURL('https://www.welcometothejungle.com/fr/me/settings/account');
        await uploadProfilePictureFull(page, 'fixtures/image.png');
    });
});