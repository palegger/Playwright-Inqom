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

module.exports = { login, loginFull };