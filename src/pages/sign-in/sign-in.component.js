import { Component } from "../../core/Component";
import template from "./sign-in.template.hbs";
import { ROUTES } from "../../constants/routes";

import { useToastNotification } from "../../hooks/useToastNotification";

export class SignIn extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      errors: {
        email: "",
      },
      isLoading: false,
    };
  }
}

customElements.define("signin-page", SignIn);
