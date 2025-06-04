import { test } from "@playwright/test";
import { allure } from "allure-playwright";

import { AuthPage } from "../pages/AuthPage";
import { LoginPage } from "../pages/LoginPage";

test.describe("User can log in", () => {
  let authPage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    authPage = new AuthPage(page);
    loginPage = new LoginPage(page);
    await authPage.open();
    await authPage.verifyUrl('/sign-in');
    await authPage.navigateToLogin();
    await loginPage.verifyPageIsLoaded();
  });

  test("Successfull login", async () => {
    await loginPage.login();
  });

  test("Unsusseccfull login", async () => {
    await loginPage.login("invalid@email.com", "wrong_password");
    await loginPage.verifyLoginError('Пожалуйста, заполните это поле')
  });
});
