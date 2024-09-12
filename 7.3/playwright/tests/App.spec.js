
const {test, expect } = require('@playwright/test');
const formData = require('./user.js');

test('testCorrectLogin', async ({page}) => {
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
  await page.waitForTimeout(5000);
  const title = await page.title();
  expect(title).toBe('Мои программы обучения');

});

test("testIncorrectLogin", async ({page})=>{
  await page.goto('https://netology.ru/');

  // Click text=Войти
  await Promise.all([
    page.waitForNavigation(),
    page.click('text=Войти')
  ]);

  // Fill email and password
  await page.fill('[placeholder="Email"]', "email@email.com");
  await page.fill('[placeholder="Пароль"]', "Password");

  // Click login button
  await Promise.all([
    page.click('[data-testid="login-submit-btn"]')
  ]);
  await expect(page.locator('[data-testid=login-error-hint]')).toBeVisible();
});