const { test, expect } = require('@playwright/test');
const { login, loginFull } = require('../tests-helpers/login.js');

test.describe('Login tests', () => {
  test('Attempting to login with incorrect credentials', async ({ page }) => {
    await page.goto('https://www.welcometothejungle.com/fr/signin');

    const response = await login(page, 'bademail@gmail.com', 'badpassword', true);
    expect(response.status()).toBe(401);
    await page.$('span:has-text("Mauvais identifiant ou mot de passe")');
  });

  test('Attempting to login with incorrect email syntaxe', async ({ page }) => {
    await page.goto('https://www.welcometothejungle.com/fr/signin');
    const response = await login(page, 'bademail', 'badpassword', false);
    const text = await page.locator('span:text("Email invalide")');
    await expect(text).toHaveCSS('color', 'rgb(175, 70, 54)');   
  });

  test('Attempting to login without any credentials', async ({ page }) => {
    await page.goto('https://www.welcometothejungle.com/fr/signin');
    await page.getByTestId('login-button-submit').click();
    const spanEmail = await page.locator('span:text("Champ requis")');
    await expect(spanEmail).toHaveCSS('color', 'rgb(175, 70, 54)');
    const spanPassword = await page.locator('span:text("Doit contenir au minimum 8 caractères")');
    await expect(spanPassword).toHaveCSS('color', 'rgb(175, 70, 54)');
  });

  test('Attempting to login', async ({ page }) => {
    await loginFull(page);
  });
});