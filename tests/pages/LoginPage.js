import { BasePage } from "./BasePage";
export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailField = page.locator(`[type="email"]`);
    this.passwordField = page.locator(`[type="password"]`);
    this.submitButton = page.getByRole('button', {name: 'Войти'})
    this.errorMessage = page.locator('#error-message')
  }

  async verifyPageIsLoaded() {
    await this.waitForPageLoad();
    await this.verifyUrl(/sign-in/);
    await this.verifyTitle("Вход в аккаунт");
    await this.verifyElementVisible(this.emailField);
    await this.verifyElementVisible(this.passwordField);
    await this.verifyElementVisible(this.submitButton)
  }

  async login(email, password) {
    await this.emailField.fill(email)
    await this.passwordField.fill(password)
    await this.clickElement(this.submitButton)
  }

  async verifyLoginError(expectedError, expectedCount = 2) {
    await this.verifyMultipleErrors(this.errorMessage, expectedError, expectedCount);
  }
}
