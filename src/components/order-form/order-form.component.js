import { Component } from "../../core/Component";
import template from "./order-form.template.hbs";

export class OrderForm extends Component {
  constructor() {
    super();

    this.template = template();
    this.state = {};
  }
}

customElements.define("ui-order-form", OrderForm);
