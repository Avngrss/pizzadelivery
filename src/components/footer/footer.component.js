import { Component } from "../../core/Component";
import template from "./footer.template.hbs";

export class Footer extends Component {
  constructor() {
    super();

    this.template = template();
    this.state = {};
  }
}

customElements.define("ui-footer", Footer);
