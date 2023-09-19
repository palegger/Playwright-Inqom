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
    await page.reload();
    const img = await page.getByTestId('account-edit-field-avatar').locator('img');
    const src = await img.getAttribute('src');
    expect(src).toContain('https://cdn-images.welcometothejungle.com');
}

async function checkThatImageIsNotHere(page) {
    const title = await page.locator('h4:has-text("Ajouter un fichier")');
    await expect(title).toBeVisible();
    const sentence = await page.locator('p:has-text("Glisser-déposer une image ici ou…")');
    await expect(sentence).toBeVisible();
}

module.exports = { uploadProfilePicture, uploadProfilePictureFull, checkThatImageIsNotHere};