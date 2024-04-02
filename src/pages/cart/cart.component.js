import { Component } from "../../core/Component";
import { ROUTES } from "../../constants/routes";
import template from "./cart.template.hbs";

export class CartPage extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
  }
}

customElements.define("cart-page", CartPage);
