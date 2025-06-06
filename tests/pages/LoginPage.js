import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailField = {
      default: page.locator('ui-input[name="email"] input[type="email"]'),
      webkit: page.locator('ui-input[name="email"]')
    };
    
    this.passwordField = {
      default: page.locator('ui-input[name="password"] input[type="password"]'),
      webkit: page.locator('ui-input[name="password"]')
    };
    
    this.submitButton = page.getByRole('button', { name: 'Войти' });
    this.errorMessage = page.locator('#error-message');
    this.loginMenu = page.locator("#user-menu");
  }

  async verifyPageIsLoaded(browserName = 'chromium') {
    await this.waitForPageLoad();
    await this.verifyUrl(/sign-in/);
    await this.verifyTitle("Вход в аккаунт");

    const emailLocator = browserName === 'webkit' 
      ? this.emailField.webkit 
      : this.emailField.default;
      
    const passwordLocator = browserName === 'webkit'
      ? this.passwordField.webkit
      : this.passwordField.default;

    await this.verifyElementVisible(emailLocator);
    await this.verifyElementVisible(passwordLocator);
    await this.verifyElementVisible(this.submitButton);
  }

  async login(email, password, browserName = 'chromium') {
    const emailField = browserName === 'webkit'
      ? this.emailField.webkit
      : this.emailField.default;
      
    const passwordField = browserName === 'webkit'
      ? this.passwordField.webkit
      : this.passwordField.default;

    await emailField.fill(email);
    await passwordField.fill(password);
    await this.clickElement(this.submitButton);

    if (browserName === 'webkit') {
      await this.page.waitForLoadState('networkidle');
    }
  }

  async verifyLoginError(expectedError, expectedCount = 2, browserName = 'chromium') {
    const adjustedError = browserName === 'webkit' 
      ? "Пожалуйста, заполните это поле"
      : expectedError;
      
    await this.verifyMultipleErrors(this.errorMessage, adjustedError, expectedCount);
  }

  async verifyUserMenuVisible() {
    await this.verifyElementVisible(this.loginMenu);
  }
}