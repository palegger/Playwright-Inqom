const { expect } = require('@playwright/test');

async function login(page, email, password, response) {
    await page.getByTestId('login-field-email').fill(email);
    await page.getByTestId('login-field-password').fill(password);
    await page.getByTestId('login-button-submit').click();
    if (response)
        return await page.waitForResponse(response => response.url() === 'https://api.welcometothejungle.com/api/v1/sessions');
}

async function loginFull(page) {
    await page.goto('https://www.welcometothejungle.com/fr/signin');
    const response = await login(page, process.env.EMAIL, process.env.PASSWORD, true);
    expect(response.status()).toBe(201);
}

async function loginWithNoCredentials(page) {
    await page.getByTestId('login-button-submit').click();
    const spanEmail = await page.locator('span:text("Champ requis")');
    await expect(spanEmail).toHaveCSS('color', 'rgb(175, 70, 54)');
    const spanPassword = await page.locator('span:text("Doit contenir au minimum 8 caractères")');
    await expect(spanPassword).toHaveCSS('color', 'rgb(175, 70, 54)');
}

module.exports = { login, loginFull, loginWithNoCredentials };