import { Component } from "../../core/Component";
import template from "./menu.template.hbs";
import { ROUTES } from "../../constants/routes";

export class Menu extends Component {
  constructor() {
    super();

    this.template = template({
      routes: ROUTES,
    });
    this.state = {};
  }
}

customElements.define("ui-menu", Menu);
