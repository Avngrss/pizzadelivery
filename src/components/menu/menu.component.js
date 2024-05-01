import { Component } from "../../core/Component";
import template from "./menu.template.hbs";
import { ROUTES } from "../../constants/routes";
import { useUserStore } from "../../hooks/useStoreUser";
import { authService } from "../../services/Auth";
import { useToastNotification } from "../../hooks/useToastNotification";
import { useNavigate } from "../../hooks/useNavigate";
import { useModal } from "../../hooks/useModal";
import { extractFormData } from "../../utils/extractFormData";
import { TOAST_TYPE } from "../../constants/toast";
import { apiServes } from "../../services/Api";
import { mapResponseApiData } from "../../utils/api";

import "../../../style.css";

export class Menu extends Component {
  constructor() {
    super();

    this.template = template({
      routes: ROUTES,
    });

    this.state = {
      isOpen: false,
      isLoading: false,
      user: null,
      orderCart: [],
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

  openCallModal() {
    useModal({
      isOpen: true,
      showBtn: true,
      template: "ui-call-form",
      successBtn: true,
      successCaption: "Заказать звонок",
      rejectCaption: "Отменить",
      title: "Заказать звонок",
      onSuccess: (modal) => {
        const form = modal.querySelector(".call-form");
        const formData = extractFormData(form);
        console.log(formData);
        useToastNotification({
          message: "Ваше сообщение получено. В скором времени с вами свяжутся",
          type: TOAST_TYPE.success,
        });
      },
    });
  }
  async openCartModal() {
    useModal({
      isOpen: true,
      template: "ui-cart-form",
      orderBtn: "Заказать",
      title: "Корзина",
      onSuccess: () => {},
    });
  }

  onClick = ({ target }) => {
    if (target.closest(".order-call")) {
      this.openCallModal();
    }
    if (target.closest(".cart")) {
      this.openCartModal();
    }
  };

  logoutBtn = ({ target }) => {
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
  async init() {
    try {
      const { getUser } = useUserStore();
      const { data } = await apiServes.get("/order");
      const result =  mapResponseApiData(data ?? {});
      this.setState({
        orderCart: result,
        user: getUser(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.setUser();
    this.init();
    this.addEventListener("click", this.linkEmail);
    this.addEventListener("click", this.logoutBtn);
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.linkEmail);
    this.removeEventListener("click", this.logoutBtn);
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("ui-menu", Menu);
