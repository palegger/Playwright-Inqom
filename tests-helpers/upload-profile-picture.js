const { expect } = require('@playwright/test');

async function uploadProfilePicture(page, name, isImageCorrect) {
    await page.locator('input[name="avatar"]').setInputFiles(name);
    await page.getByTestId('account-edit-field-avatar').getByRole('button').getByAltText('Edit').click();
    if(isImageCorrect) {
        const img = await page.getByTestId('account-edit-field-avatar').locator('img');
        const src = await img.getAttribute('src');
        expect(src).toContain('blob');
    }
}

async function uploadProfilePictureFull(page, name) {
    await uploadProfilePicture(page, name);

    await page.getByTestId('account-edit-button-submit').click();
    const response = await page.waitForResponse(response => response.url() === 'https://api.welcometothejungle.com/api/v1/registrations' && response.request().method() === 'PUT');
    expect(response.status()).toBe(200);
}

module.exports = { uploadProfilePicture, uploadProfilePictureFull};