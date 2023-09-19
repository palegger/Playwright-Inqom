const { test, expect } = require('@playwright/test');
const { login } = require('../tests-helpers/login.js');
const { uploadProfilePicture, uploadProfilePictureFull } = require('../tests-helpers/upload-profile-picture.js');

let page = undefined;

test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test.afterAll(async () => {
    await page.close();
});

test.describe('Uploading profile picture', () => {
    test('Setup login', async () => {
        await page.goto('https://www.welcometothejungle.com/fr/signin');
        const response = await login(page, process.env.EMAIL, process.env.PASSWORD, true);
        expect(response.status()).toBe(201);
        await page.waitForURL('https://www.welcometothejungle.com/fr/me/settings/account');
    });

    test('Uploading the correct profile picture', async () => {
        await uploadProfilePictureFull(page, 'fixtures/image.png');
    });

    test('Uploading a profile picture too big', async () => {
        await page.goto('https://www.welcometothejungle.com/fr/me/settings/account');
        await uploadProfilePicture(page, 'fixtures/too-big-image.jpg', false);
        const text = await page.locator('span:text("Fichier trop lourd. Vous ne pouvez pas dépasser : 1.00 MB")')
        await text.click()
        await expect(text).toHaveCSS('color', 'rgb(175, 70, 54)');  
        await expect(text).toBeVisible();
    });

    test('Uploading a profile pdf', async () => {
        await page.goto('https://www.welcometothejungle.com/fr/me/settings/account');
        await uploadProfilePicture(page, 'fixtures/sample.pdf', false);
        const text = await page.locator('span:text("Format non pris en charge. Vous pouvez télécharger : gif, jpeg, png")')
        await text.click();
        await expect(text).toHaveCSS('color', 'rgb(175, 70, 54)');  
        await expect(text).toBeVisible();
    });
});
