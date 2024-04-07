import axios from "axios";

class ApiServes {
  constructor() {
    this.apiInstance = axios.create({
      baseURL:
        "https://task-manager-api-fb4a0-default-rtdb.europe-west1.firebasedatabase.app",
    });
  }

  post(url, data = {}, headers = {}) {
    return this.apiInstance.post(url.concat(".json"), data, headers);
  }

  get(url, headers = {}) {
    return this.apiInstance.get(url.concat(".json"), headers);
  }

  patch(url, data, headers = {}) {
    return this.apiInstance.patch(url.concat(".json"), data, headers);
  }

  delete(url, headers = {}) {
    return this.apiInstance.delete(url.concat(".json"), headers);
  }
}

export const apiServes = new ApiServes();
