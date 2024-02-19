const { test, expect } = require("@playwright/test");
const {
  email,
  password,
  incorrectEmail,
  incorrectPassword,
} = require("../user");

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', email);
  await page.fill('[placeholder="Пароль"]', password);
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page.locator("h2")).toHaveText("Моё обучение");
  await page.screenshot({ path: "screenshotSuccessful.png", fullPage: true });
});

test("Failed authorization", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', incorrectEmail);
  await page.fill('[placeholder="Пароль"]', incorrectPassword);
  await page.click('[data-testid="login-submit-btn"]');
  const error = await page.locator('[data-testid="login-error-hint"]');
  await expect(error).toHaveText("Вы ввели неправильно логин или пароль");
  await page.screenshot({ path: "screenshotFailed.png", fullPage: true });
});
