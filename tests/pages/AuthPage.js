import { BasePage } from './BasePage.js';

export class AuthPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginButton = page.locator('#login-btn');
    this.registerButton = page.locator('#register-btn');
  }


  async navigateToLogin() {
    await this.clickElement(this.loginButton);
    await this.waitForPageLoad()
    return new LoginPage(this.page);
  }

  async navigateToRegister() {
    await this.clickElement(this.registerButton);
    await this.waitForPageLoad()
    return new RegisterPage(this.page);
  }
}