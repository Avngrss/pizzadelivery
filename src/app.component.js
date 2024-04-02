import { Component } from "./core/Component";
import template from "./app.template.hbs";
import { ROUTES } from "./constants/routes";

import "./core/Router";

import "./pages/home/home.component";
import "./pages/not-found/not-found.component";
import "./pages/cart/cart.component";
import "./pages/contacts/contacts.component";
import "./pages/sign-in/sign-in.component";
import "./pages/sign-up/sign-up.components";
import "./pages/products/products.component";

import "./components/toast/toast.component";
import "./components/input/input.component";
import "./components/button/button.component";
import "./components/loader/loader.component";

export class App extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {};
  }
}

customElements.define("my-app", App);
