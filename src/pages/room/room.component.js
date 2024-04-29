import { Component } from "../../core/Component";
import template from "./room.template.hbs";
import { useModal } from "../../hooks/useModal";
import { useToastNotification } from "../../hooks/useToastNotification";
import { extractFormData } from "../../utils/extractFormData";
import { TOAST_TYPE } from "../../constants/toast";
import { useUserStore } from "../../hooks/useStoreUser";
import { apiServes } from "../../services/Api";
import { mapResponseApiData } from "../../utils/api";

export class Room extends Component {
  constructor() {
    super();

    this.template = template({});

    this.state = {
      isLoading: false,
      user: null,
      cart: [],
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
      successBtn: true,
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
        body.innerHTML = "";
        apiServes.delete("/order");
      },
    });
  }
  deleteItem = ({ target }) => {
    const cartBtnDelete = target.closest(".delete-btn");
    if (cartBtnDelete) {
      let id = target.parentElement.parentElement.dataset.id;
      apiServes.delete("/order", id).then(() => {
        apiServes.get("/order", id).then(({ data }) => {
          this.setState({
            ...this.state,
            cart: data,
          });
        });
      });
    }
  };
  onClick = ({ target }) => {
    if (target.closest(".order")) {
      this.openOrderModal();
    }
    if (target.closest(".clear")) {
      const body = document.querySelector(".order-body");
      let id = target.parentElement.parentElement.dataset.id;
      apiServes.delete("/order", id).then(() => {
        apiServes.get("/order", id).then(({ data }) => {
          this.setState({
            ...this.state,
            cart: data,
          });
        });
      });
      body.innerHTML = "";
    }
  };
  async init() {
    try {
      const { data } = await apiServes.get("/order");
      this.setState({
        ...this.state,
        cart: mapResponseApiData(data),
      });
    } catch ({ message }) {
      useToastNotification({ message });
    }
  }
  initUser() {
    const { getUser } = useUserStore();
    this.setState({
      ...this.state,
      user: getUser(),
    });
  }
  componentDidMount() {
    this.init();
    this.initUser();
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("room-page", Room);
