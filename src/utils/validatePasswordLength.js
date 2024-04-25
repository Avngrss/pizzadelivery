export const validatePasswordLength = (formData, callbackError) => {
  for (let key in formData) {
    const message =
      key == "password" && formData[key].length < 6
        ? "Пароль должен содержать не менее 6 символов"
        : "";
    callbackError(key, formData[key], message);
  }
};
