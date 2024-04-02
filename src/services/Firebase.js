import { initializeApp } from "firebase/app";

export class Firebase {
  constructor() {
    this._app = initializeApp({
      apiKey: import.meta.env.VITE_API_KEY, //AIzaSyARWlYwCmDlYghWVzON9xxgE_2uvl93mp0
      authDomain: "pizza-delivery-api-c5dbf.firebaseapp.com",
      projectId: "pizza-delivery-api-c5dbf",
      storageBucket: "pizza-delivery-api-c5dbf.appspot.com",
      messagingSenderId: "942029041721",
      appId: "1:942029041721:web:c9703859875bbbc99a5de8",
    });
  }

  get app() {
    return this._app;
  }
}

export const firebaseService = new Firebase();
