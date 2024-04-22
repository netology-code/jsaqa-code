const { test, expect } = require("@playwright/test");

test("validAvtorization", async ({ page }) => {
  test('test', async ({ page }) => {
    await page.goto('https://netology.ru/');
    await page.getByRole('link', { name: 'Войти' }).click();
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill(myEmail);
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill(myPassword);
    await page.getByTestId('login-submit-btn').click();
    await expect(page.text('Моё обучение').toBeVisible());
  });
});
