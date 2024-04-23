import { Component } from "../../core/Component";
import template from "./input.template.hbs";

export class Input extends Component {
  constructor() {
    super();
    this.template = template();

    this.state = {
      label: this.getAttribute("label") ?? "",
      name: this.getAttribute("name") ?? "text",
      type: this.getAttribute("type") ?? "text",
      placeholder: this.getAttribute("placeholder") ?? "",
      className: this.getAttribute("class-name"),
      required: this.getAttribute("required") ?? true,
    };
  }
}

customElements.define("ui-input", Input);
