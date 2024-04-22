const { test, expect } = require("@playwright/test");

test('validAuthorization', async ({ page }) => {

  await page.goto('https://netology.ru/');
  await page.click('text=Войти');
  await page.click('[placeholder="Email"]');
  await page.fill('[placeholder="Email"]', myEmail);
  await page.click('[placeholder="Пароль"]');
  await page.fill('[placeholder="Пароль"]', myPassword);
  await page.click('[data-testid="login-submit-btn"]');
  await expect (page.getByText('Моё обучение')).toBeVisible();
  await expect (page.toHaveURL("https://netology.ru/profile/8001073"));
  await browser.close();
});


test('notValidAvtorization', async ({ page }) => {

  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('123@mail.ru');
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill('123');
  await page.getByTestId('login-submit-btn').click();
  await expect(page.getByTestId('login-error-hint').toHaveText('Вы ввели неправильно логин или пароль').toBeVisible);
  await browser.close();
});