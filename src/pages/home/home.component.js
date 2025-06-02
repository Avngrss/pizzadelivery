import { Component } from "../../core/Component";
import "../../components/router-link.component";
import template from "./home.template.hbs";
import { ROUTES } from "../../constants/routes";

import { useUserStore } from "../../hooks/useStoreUser";

export class HomePage extends Component {
  constructor() {
    super();
    this.template = template();
    this.state = {
      links: [
        {
          label: "Войти",
          href: ROUTES.signIn,
          id: "login-btn"
        },
        {
          label: "Регистрация",
          href: ROUTES.signUp,
          id: "register-btn"
        },
      ],
    };
  }

  setLinks = () => {
    const { getUser } = useUserStore();
    if (getUser()) {
      this.setState({
        links: [
          {
            label: "Магазин",
            href: ROUTES.products,
          },
        ],
      });
    }
  };

  componentDidMount() {
    this.setLinks();
  }
}

customElements.define("home-page", HomePage);
