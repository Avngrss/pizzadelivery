import { Component } from "../../core/Component";
import template from "./call-form.template.hbs";

export class CallForm extends Component {
  constructor() {
    super();

    this.template = template();
    this.state = {};
  }
}

customElements.define("ui-call-form", CallForm);
