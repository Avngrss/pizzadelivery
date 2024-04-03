import { Component } from "../../core/Component";
import "../../components/router-link.component";
import template from "./home.template.hbs";
import { ROUTES } from "../../constants/routes";

import { useUserStore } from "../../hooks/useStoreUser";

export class HomePage extends Component {
  constructor() {
    super();
    this.template = template({
      links: [
        {
          label: "Войти",
          href: ROUTES.signIn,
        },
        {
          label: "Зарегистрироваться",
          href: ROUTES.signUp,
        },
      ],
    });
  }

  setLinks = () => {
    const { getUser } = useUserStore();
    if (getUser()) {
      this.setState({
        links: [
          {
            label: "Products",
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
