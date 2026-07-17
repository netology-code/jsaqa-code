const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

test.setTimeout(120000);

test("Успешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in", {
    waitUntil: "domcontentloaded",
  });

  // Скриншот страницы входа
  await page.screenshot({
    path: "screenshots/01-success-login-page.png",
    fullPage: true,
  });

  await page.getByText("Другие способы входа", { exact: true }).click();
  await page.getByText("Войти по почте", { exact: true }).click();

  // Скриншот формы входа (без введённых данных)
  await page.screenshot({
    path: "screenshots/02-success-email-login-form.png",
    fullPage: true,
  });

  // Вводим логин и пароль
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);

  await page
    .getByRole("button", {
      name: "Войти",
      exact: true,
    })
    .click();

  // Находим iframe CAPTCHA
  const captchaFrame = page.frameLocator(
    'iframe[title="SmartCaptcha advanced"]',
  );

  // Ждём, пока внутри iframe появится окно CAPTCHA
  await expect(captchaFrame.locator(".Captcha-ModalContent")).toBeVisible({
    timeout: 30000,
  });

  // Делаем скриншот открытой CAPTCHA
  await page.screenshot({
    path: "screenshots/03-success-captcha.png",
    fullPage: true,
  });

  // Ждём открытия профиля после ручного прохождения CAPTCHA
  await expect(page).toHaveURL(/\/profile\/\d+$/, {
    timeout: 90000,
  });

  // Проверяем приветствие
  await expect(page.getByText(/Здравствуйте,\s*Светлана/)).toBeVisible({
    timeout: 30000,
  });

  // Скриншот профиля
  await page.screenshot({
    path: "screenshots/04-success-profile.png",
    fullPage: true,
  });
});
test("Неуспешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in", {
    waitUntil: "domcontentloaded",
  });

  // Скриншот страницы входа
  await page.screenshot({
    path: "screenshots/05-failed-login-page.png",
    fullPage: true,
  });

  await page.getByText("Другие способы входа", { exact: true }).click();
  await page.getByText("Войти по почте", { exact: true }).click();

  // Скриншот формы входа (без введённых данных)
  await page.screenshot({
    path: "screenshots/06-failed-email-login-form.png",
    fullPage: true,
  });

  // Вводим неверные данные
  await page.fill('input[name="email"]', "test@test.ru");
  await page.fill('input[name="password"]', "123456789");

  await page
    .getByRole("button", {
      name: "Войти",
      exact: true,
    })
    .click();

  // Находим iframe CAPTCHA
  const captchaFrame = page.frameLocator(
    'iframe[title="SmartCaptcha advanced"]',
  );

  // Ждём появления CAPTCHA
  await expect(captchaFrame.locator(".Captcha-ModalContent")).toBeVisible({
    timeout: 30000,
  });

  // Скриншот CAPTCHA
  await page.screenshot({
    path: "screenshots/07-failed-captcha.png",
    fullPage: true,
  });

  // Ждём появления ошибки после прохождения CAPTCHA
  const errorMessage = page.getByText(
    /Вы ввели неправильно логин или пароль|слишком много попыток|повторить через 30 секунд/i,
  );

  await expect(errorMessage).toBeVisible({
    timeout: 90000,
  });

  // Скриншот ошибки
  await page.screenshot({
    path: "screenshots/08-failed-error.png",
    fullPage: true,
  });
});
