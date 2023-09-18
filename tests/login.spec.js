const { test, expect } = require('@playwright/test');
const { login } = require('../tests-helpers/login.js');
const { testIgnore } = require('../playwright.config.js');
require('dotenv').config();

test.describe('Login tests', () => {
  test('Attempting to login with incorrect credentials', async ({ page }) => {
    const response = await login(page, 'bademail@gmail.com', 'badpassword', true);
    expect(response.status()).toBe(401);
    await page.$('span:has-text("Mauvais identifiant ou mot de passe")');
  });

  test('Attempting to login with incorrect email syntaxe', async ({ page }) => {
    const response = await login(page, 'bademail', 'badpassword', false);
    const text = await page.locator('span:text("Email invalide")');
    await expect(text).toHaveCSS('color', 'rgb(175, 70, 54)');   
  });

  test('Attempting to login', async ({ page }) => {
    const response = await login(page, process.env.EMAIL, process.env.PASSWORD, true);
    expect(response.status()).toBe(201);
    await page.waitForURL('https://www.welcometothejungle.com/fr/me/settings/account');
  });
});