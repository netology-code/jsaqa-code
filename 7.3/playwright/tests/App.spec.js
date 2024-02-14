const { test, expect } = require("@playwright/test");
const { email, password } = require("../user.js");

const faker = require("faker");

const email2 = faker.internet.email();
const password2 = faker.internet.password();

test("Authorization is succsesfull", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();

  await expect(page).toHaveURL("https://netology.ru/profile/8169730");
  await page.waitForSelector("h2");

  const profilePageTitle = await page.textContent("h2");
  expect(profilePageTitle).toContain("Моё обучение");
});


test("Authorization failed", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(email2);
  await page.getByPlaceholder("Пароль").fill(password2);
  await page.getByTestId("login-submit-btn").click();

  const textContent = await page.textContent(
    '//div[@data-testid="login-error-hint"]'
  );

  expect(textContent).toContain("Вы ввели неправильно логин или пароль");
});
