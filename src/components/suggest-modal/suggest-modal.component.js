import { Component } from "../../core/Component";
import template from "./suggest-modal.template.hbs";

export class SuggestModal extends Component {
  constructor() {
    super();

    this.template = template();
    this.state = {};
  }
}

customElements.define("ui-suggest-modal", SuggestModal);
