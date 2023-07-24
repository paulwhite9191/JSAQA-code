const { test, expect } = require("@playwright/test");
const {
  email,
  password,
  incorrectEmail,
  incorrectPassword,
} = require("./user.js");

test.beforeEach(async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe("Тесты авторизации на сайте netology.ru", () => {
  test("Позитивный сценарий", async ({ page }) => {
    await page.locator('[placeholder="Email"]').fill(email);
    await page.locator('[placeholder="Пароль"]').fill(password);
    await page.locator('[data-testid="login-submit-btn"]').click();
    await expect(page).toHaveURL("https://netology.ru/profile");
    await expect(page.locator("h2")).toHaveText("Мои курсы и профессии");
    await page.screenshot({ path: "./screenshots/success.jpg" });
  });

  test("Негативный сценарий", async ({ page }) => {
    await page.locator('[placeholder="Email"]').fill(incorrectEmail);
    await page.locator('[placeholder="Пароль"]').fill(incorrectPassword);
    await page.click('[data-testid="login-submit-btn"]');
    await expect(page.locator("data-testid=login-error-hint")).toHaveText(
      "Вы ввели неправильно логин или пароль"
    );
    await page.screenshot({ path: "./screenshots/error.jpg" });
  });
});
