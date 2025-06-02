import { BasePage } from './BasePage.js';

export class AuthPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginButton = page.locator('#login-btn');
    this.registerButton = page.locator('#register-btn');
  }

  async navigateToLogin() {
    await this.loginButton.click();
    return new LoginPage(this.page);
  }

  async navigateToRegister() {
    await this.registerButton.click();
    return new RegisterPage(this.page);
  }
}