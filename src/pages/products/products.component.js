import { Component } from "../../core/Component";
import "../../components/router-link.component";
import template from "./products.template.hbs";
import { ROUTES } from "../../constants/routes";

export class ProductsPage extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
  }
}

customElements.define("products-page", ProductsPage);
