export const validateIsNotEmptyFields = (formData, callbackError) => {
  for (let key in formData) {
    const message = !formData[key] ? "Пожалуйста, заполните это поле" : "";
    callbackError(key, formData[key], message);
  }
};
