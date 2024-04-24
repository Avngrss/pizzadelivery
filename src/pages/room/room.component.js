import { Component } from "../../core/Component";
import template from "./room.template.hbs";
import { useModal } from "../../hooks/useModal";
import { useToastNotification } from "../../hooks/useToastNotification";
import { extractFormData } from "../../utils/extractFormData";
import { TOAST_TYPE } from "../../constants/toast";
import { useUserStore } from "../../hooks/useStoreUser";

export class Room extends Component {
  constructor() {
    super();

    this.template = template({});

    this.state = {
      isLoading: false,
    };
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  openOrderModal() {
    useModal({
      isOpen: true,
      template: "ui-order-form",
      successCaption: "Заказать",
      title: "Оформить заказ",
      onSuccess: (modal) => {
        const body = document.querySelector(".order-body");
        body.innerHTML = "";
        const form = modal.querySelector(".order-form");
        const formData = extractFormData(form);
        console.log(formData);
        useToastNotification({
          message: "Ваше сообщение получено. В скором времени с вами свяжутся",
          type: TOAST_TYPE.success,
        });
      },
    });
  }

  onClick = ({ target }) => {
    if (target.closest(".order")) {
      this.openOrderModal();
    }
  };

  componentDidMount() {
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("room-page", Room);
