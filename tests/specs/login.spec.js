import { test } from "@playwright/test";
import { allure } from "allure-playwright";
import { AuthPage } from "../pages/AuthPage";
import { LoginPage } from "../pages/LoginPage";

test.describe("User can log in", () => {
  let authPage;
  let loginPage;

  test.beforeEach(async ({ page, browserName }) => {
    authPage = new AuthPage(page);
    loginPage = new LoginPage(page);

    await test.step("Auth page preparation", async () => {
      await authPage.open();
      await authPage.verifyUrl("/");
    });

    await test.step("Login page preparation", async () => {
      await authPage.navigateToLogin();
      await loginPage.verifyPageIsLoaded(browserName); //
    });
  });

  test("Successfull login", async ({ page, browserName }) => {
    allure.feature('Login');
    allure.label('severity', 'critical');
    allure.tag('smoke');
    allure.description('Successfull login with valid credential');

    await test.step("Perform login with valid credentials", async () => {
      await loginPage.login("justtest@gmail.com", "justpass", browserName); 
    });

    await test.step("Verify successful login", async () => {
      await loginPage.verifyUserMenuVisible();
      await authPage.verifyUrl("/products");
      if (browserName === 'webkit') {
        await page.waitForLoadState('networkidle');
      }
    });
  });

  test("Unsuccessfull login with invalid credential", async ({ browserName }) => {
    allure.feature('Login');
    allure.label('severity', 'critical');
    allure.tag('smoke');
    allure.description('Unsuccessfull login with invalid credential');

    const invalidData = {
      email: "invalid@email.com",
      password: "wrong_password",
    };

    await test.step(`Try login with invalid data`, async () => {
      await loginPage.login(invalidData.email, invalidData.password, browserName);
    });

    await test.step("Verify error state and remain on the page", async () => {
      await authPage.verifyUrl("/sign-in");
    });
  });

  test("Unsuccessfull login with empty credential", async ({ browserName }) => {
    allure.feature('Login');
    allure.label('severity', 'critical');
    allure.tag('smoke');
    allure.description('Unsuccessfull login with empty credential');

    await test.step("Perform login with empty credentials", async () => {
      await loginPage.login("", "", browserName);
    });

    await test.step("Verify validation errors", async () => {
      const expectedError = browserName === 'webkit' 
        ? "Пожалуйста, заполните это поле" 
        : "Пожалуйста, заполните это поле";
      
      await loginPage.verifyLoginError(expectedError);
      await authPage.verifyUrl("/sign-in");
    });
  });
});