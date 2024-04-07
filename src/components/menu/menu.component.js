import { Component } from "../../core/Component";
import template from "./menu.template.hbs";
import { ROUTES } from "../../constants/routes";
import { useUserStore } from "../../hooks/useStoreUser";
import { authService } from "../../services/Auth";
import { useToastNotification } from "../../hooks/useToastNotification";
import { useNavigate } from "../../hooks/useNavigate";
import { TOAST_TYPE } from "../../constants/toast";

import "../../../style.css";

export class Menu extends Component {
  constructor() {
    super();

    this.template = template({
      routes: ROUTES,
    });

    this.state = {
      isLoading: false,
      user: null,
    };
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  logout = () => {
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    authService
      .logOut()
      .then(() => {
        setUser(null);
        useToastNotification({
          type: TOAST_TYPE.success,
          message: "Вы вышли из системы!",
        });
        useNavigate(ROUTES.home);
      })
      .catch(({ message }) => {
        useToastNotification({ message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  };

  linkEmail = (e) => {
    const target = e.target;
    if (target.matches(".email")) {
      e.preventDefault();
    }
  };

  onClick = ({ target }) => {
    if (target.closest(".logout-btn")) {
      this.logout();
    }
  };

  setUser() {
    const { getUser } = useUserStore();
    this.setState({
      ...this.state,
      user: getUser(),
    });
  }

  componentDidMount() {
    this.setUser();
    this.addEventListener("click", this.linkEmail);
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.linkEmail);
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("ui-menu", Menu);
