import {myEmail, myPassword} from 'user.js';
const { test, expect } = require("@playwright/test");


test("validAvtorization", async ({ page }) => {
    test.slow();
    await page.goto('https://netology.ru/');
    await page.getByRole('link', { name: 'Войти' }).click();
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(myEmail);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill(myPassword);
    await page.getByTestId('login-submit-btn').click();
    await expect(page).toHaveText('Моё обучение').toBeVisible();
    await expect(page).toHaveURL("https://netology.ru/profile/8001073");
    await browser.close();
});
test('notValidAvtorization', async ({ page }) => {
  test.slow();
  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('a@yandex.ru');
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill('123');
  await page.getByTestId('login-submit-btn').click();
  await expect (page.getByTestId('login-error-hint').toHaveText('Вы ввели неправильно логин или пароль').toBeVisible);
  await browser.close();
});
