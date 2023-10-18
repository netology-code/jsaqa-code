const { test, expect } = require("@playwright/test");
const { password } = require("../user.js");
const { email } = require("../user.js");
//const { password } = require("../user.js");

test.beforeEach(async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
});

test("Success authorization netology", async ({ page }) => {
  await page.locator('[placeholder="Email"]').fill(email);
  await page.locator('[name="password"]').fill(password);
  await page.locator('[data-testid="login-submit-btn"]').click();

  const header = await page.locator("h2").first();
  await expect(header).toHaveText("Моё обучение");

  await page.screenshot({
    path: "image/screenshot_" + Date.now() + ".png",
  });
});

test("Failed authorization netology", async ({ page }) => {
  await page.locator('[placeholder="Email"]').fill("exemple@gmail.com");
  await page.locator('[name="password"]').fill("password");
  await page.locator('[data-testid="login-submit-btn"]').click();

  const errorText = page.locator('[data-testid="login-error-hint"]');
  await expect(errorText).toHaveText("Вы ввели неправильно логин или пароль");

  await page.screenshot({
    path: "image/screenshot_" + Date.now() + ".png",
  });
});
