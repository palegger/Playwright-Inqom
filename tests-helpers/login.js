const { Page } = require('playwright');

async function login(page, email, password, response) {
    await page.goto('https://www.welcometothejungle.com/fr/signin');
    await page.fill('input[name="email_login"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]', { force: true });
    if (response)
        return await page.waitForResponse(response => response.url() === 'https://api.welcometothejungle.com/api/v1/sessions');
}

module.exports = { login };