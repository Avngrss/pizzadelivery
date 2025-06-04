import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailField = page.locator(`[type="email"]`);
    this.nameField = page.getByLabel("Ваше имя");
    this.passwordField = page.locator(`[type="password"]`);
    this.repeatPassword = page.getByLabel("Подтвердить пароль");
    this.submitButton = page.getByRole("button", {
      name: "Зарегистрироваться  ",
    });
    this.errorMessage = page.locator("#toast-error")
  }

  async verifyPageIsLoaded() {
    await this.waitForPageLoad();
    await this.verifyUrl(/sign-up/);
    await this.verifyTitle("Регистрация");
    await this.verifyElementVisible(this.emailField);
    await this.verifyElementVisible(this.nameField);
    await this.verifyElementVisible(this.passwordField);
    await this.verifyElementVisible(this.repeatPassword);
    await this.verifyElementVisible(this.submitButton);
  }

  async register() {
    await this.emailField.fill("")
    await this.nameField.fill("")
    await this.passwordField.fill("")
    await this.repeatPassword.fill("")
    await this.clickElement(this.submitButton)
  }

  async verifyRegisterError(expectedError) {
    await this.verifyErrorInElement(this.errorMessage, expectedError);
  }
}
