
const {chromium, test, expect } = require('@playwright/test');
const formData = require('./user.js');

test('test', async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
    devtools: false,
    setDefaultTimeout: 60000,
  });
  const page = await browser.newPage();
  // Go to https://netology.ru/
  await page.goto('https://netology.ru/');

  // Click text=Войти
  await Promise.all([
    page.waitForNavigation(),
    page.click('text=Войти')
  ]);

  // Fill email and password
  await page.fill('[placeholder="Email"]', formData.username);
  await page.fill('[placeholder="Пароль"]', formData.password);

  // Click login button
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-testid="login-submit-btn"]')
  ]);

  // Check for the presence of menu-userface after navigation
  await expect(page.locator('[data-testid=menu-userface]')).toBeVisible();


  // Create new tab
  const page2 = await browser.newPage();
  // Go to https://netology.ru/
  await page2.goto('https://netology.ru/');

  // Click text=Войти
  await Promise.all([
    page2.waitForNavigation(),
    page2.click('text=Войти')
  ]);

  // Fill email and password
  await page2.fill('[placeholder="Email"]', "email@email.com");
  await page2.fill('[placeholder="Пароль"]', "Password");

  // Click login button
  await Promise.all([
    page2.waitForNavigation(),
    page2.click('[data-testid="login-submit-btn"]')
  ]);
  await expect(page.locator('[data-testid=menu-userface]')).toBeVisible();

  // Check for the presence of menu-userface after navigation
  // await page2.waitForSelector('[data-testid="login-error-hint"]', 3000);
  // await expect(page2.locator('[data-testid="login-error-hint"]').toBeVisible());
  // await browser.close();
});