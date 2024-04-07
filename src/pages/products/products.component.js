import { Component } from "../../core/Component";
import template from "./products.template.hbs";
import { ROUTES } from "../../constants/routes";

export class Products extends Component {
  constructor() {
    super();

    this.template = template({
      routes: ROUTES,
    });

    this.state = {};
  }
}

customElements.define("products-page", Products);
