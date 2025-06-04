// pages/BasePage.js
export class BasePage {
  constructor(page, path = '') {
    this.page = page;
    this.path = path;
  }

  /**
   * Открывает страницу по указанному URL
   * и ожидает загрузки DOM-дерева
   */
 async open(options = {}) {
    await this.page.goto(this.path, {
      waitUntil: 'domcontentloaded',
      ...options
    });
    await this.waitForPageLoad();
  }

  /**
   * Ожидает полной загрузки страницы (DOMContentLoaded)
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Проверяет, что текущий URL соответствует ожидаемому
   */
  async verifyUrl(expectedUrl) {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  /**
   * Проверяет заголовок страницы
   */
  async verifyTitle(expectedTitle) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

   /**
   * Кликает по элементу
   */
  async clickElement(locator) {
    await locator.click();
  }

   /**
   * Проверяет, что элемент виден на странице
   */
  async verifyElementVisible(locator) {
    await expect(locator).toBeVisible();
  }

  /**
   * Проверяет текст элемента
   */
  async verifyElementText(locator, expectedText) {
    await expect(locator).toHaveText(expectedText);
  }

  /**
   * Проверяет видимость и текст ошибки
   */
  async verifyErrorInElement(errorLocator, expectedText) {
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText(expectedText);
  }
}

