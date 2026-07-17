const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

test.setTimeout(120000);

test("Успешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in", {
    waitUntil: "domcontentloaded",
  });

  await page.getByText("Другие способы входа", { exact: true }).click();
  await page.getByText("Войти по почте", { exact: true }).click();

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);

  await page
    .getByRole("button", {
      name: "Войти",
      exact: true,
    })
    .click();

  // Проверяем, что открылась страница профиля
  await expect(page).toHaveURL(/\/profile\/\d+$/, {
    timeout: 90000,
  });

  // Проверяем заголовок-приветствие на странице профиля
  await expect(page.getByText(/Здравствуйте,\s*Светлана/)).toBeVisible({
    timeout: 30000,
  });
});

test("Неуспешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in", {
    waitUntil: "domcontentloaded",
  });

  await page.getByText("Другие способы входа", { exact: true }).click();
  await page.getByText("Войти по почте", { exact: true }).click();

  // Вводим невалидные данные
  await page.fill('input[name="email"]', "wrong@mail.ru");
  await page.fill('input[name="password"]', "123456789");

  await page
    .getByRole("button", {
      name: "Войти",
      exact: true,
    })
    .click();

  // Проверяем сообщение об ошибке
  await expect(
    page.getByText(/Вы ввели неправильно логин или пароль/),
  ).toBeVisible({
    timeout: 30000,
  });
});
