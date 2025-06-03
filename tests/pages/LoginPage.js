import { BasePage } from "./BasePage";
export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailField = page.locator(`[type="email"]`);
    this.passwordField = page.locator(`[type="password"]`);
    this.submitButton = page.getByRole('button', {name: 'Войти'})
  }

  async verifyPageIsLoaded() {
    await this.waitForPageLoad();
    await this.verifyUrl(/sign-in/);
    await this.verifyTitle("Вход в аккаунт");
    await this.verifyElementVisible(this.emailField);
    await this.verifyElementVisible(this.passwordField);
    await this.verifyElementText(this.submitButton)
  }

  async login() {
    await this.waitForPageLoad();
    await this.emailField.fill('')
    await this.passwordField.fill('')
    await this.submitButton.click()
  }
}
