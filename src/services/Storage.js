class Storage {
  constructor() {
    this.storage = window.localStorage;
  }

  setItem(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }

  getItem(key) {
    try {
      return JSON.parse(this.storage.getItem(key));
    } catch (error) {
      console.error(error);
    }
  }

  removeItem(key) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}

export const storageService = new Storage();
