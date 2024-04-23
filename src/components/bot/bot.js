import { apiServes } from "../../services/Api";

const TOKEN = "6779988224:AAGycDECx9mULQzcDBhxSgQwBAuI_eo4htc";
const CHAT_ID = "-1002058891175";
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

export const bot = (form, data) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let message = data;

    apiServes
      .post(URL_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      })
      .then(() => {
        console.log("Success");
      });
  });
};
