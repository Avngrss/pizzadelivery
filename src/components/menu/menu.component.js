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
import { bot } from "../bot/bot";
import { apiServes } from "../../services/Api";

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
      successCaption: "Отправить",
      rejectCaption: "Отменить",
      title: "Заказать звонок",
     
      onSuccess: (modal) => {
        const form = modal.querySelector(".call-form");
        const formData = extractFormData(form);
        bot(form, formData);
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
      showBtn: true,
      template: "ui-cart-form",
      successCaption: "Заказать",
      rejectCaption: "Закрыть",
      title: "Корзина",
      onSuccess: (modal) => {
        const form = modal.querySelector(".call-form");
        const formData = extractFormData(form);
      },
    });
  }

 

  onClick = ({ target }) => {
    if (target.closest(".order-call")) {
      this.openCallModal();
    }
    if(target.closest('.cart')) {
      this.openCartModal()
    }
  };

  linkEmail = (e) => {
    const target = e.target;
    if (target.matches(".email")) {
      e.preventDefault();
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

  componentDidMount() {
    this.setUser();
    this.addEventListener("click", this.linkEmail);
    this.addEventListener("click", this.logoutBtn);
    this.addEventListener("click", this.onClick);
    this.addEventListener('.click', this.deleteItem)
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.linkEmail);
    this.removeEventListener("click", this.logoutBtn);
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("ui-menu", Menu);
