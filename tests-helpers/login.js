const { expect } = require('@playwright/test');
const { Page } = require('playwright');

async function login(page, email, password, response) {
    await page.fill('input[name="email_login"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]', { force: true });
    if (response)
        return await page.waitForResponse(response => response.url() === 'https://api.welcometothejungle.com/api/v1/sessions');
}

async function loginFull(page) {
    await page.goto('https://www.welcometothejungle.com/fr/signin');
    const response = await login(page, process.env.EMAIL, process.env.PASSWORD, true);
    expect(response.status()).toBe(201);
}

module.exports = { login, loginFull };