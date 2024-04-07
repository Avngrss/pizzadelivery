import { Component } from "../../core/Component";
import template from "./logo.template.hbs";

export class Logo extends Component {
  constructor() {
    super();

    this.template = template();
    this.state = {
      caption: this.getAttribute("caption") ?? "",
      className: this.getAttribute("class-name"),
    };
  }
}

customElements.define("ui-logo", Logo);
