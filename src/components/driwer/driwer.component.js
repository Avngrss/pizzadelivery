import { Component } from "../../core/Component";
import template from "./driwer.template.hbs";
import { ROUTES } from "../../constants/routes";

export class Driver extends Component {
  constructor() {
    super();

    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      isOpenDriver: true,
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}
}

customElements.define("ui-driwer", Driver);