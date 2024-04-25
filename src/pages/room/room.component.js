import { Component } from "../../core/Component";
import template from "./room.template.hbs";
import { useModal } from "../../hooks/useModal";
import { useToastNotification } from "../../hooks/useToastNotification";
import { extractFormData } from "../../utils/extractFormData";
import { TOAST_TYPE } from "../../constants/toast";
import { useUserStore } from "../../hooks/useStoreUser";
import { storageService } from "../../services/Storage";
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
        // storageService.clear()
        body.innerHTML = ''
        apiServes.delete('/order')
      },
    });
  }

  onClick = ({ target }) => {
    if (target.closest(".order")) {
      this.openOrderModal();
    }
    if(target.closest('.clear')) {
      const body = document.querySelector(".order-body");
      storageService.clear()
      body.innerHTML = ''
    }
  };

  initializationUser() {
    const { getUser } = useUserStore();

    this.setState({
      user: getUser(),
    });
  }

  initializationOrder() {
    // const {getAllItems} = useCartStorage();

    this.setState({
      cart: apiServes.get('/order').then(({ data }) => {
        this.setState({
          ...this.state,
          cart: mapResponseApiData(data),
        });
      })
    })
  }

  componentDidMount() {
    this.addEventListener("click", this.onClick);
    this.initializationUser();
    this.initializationOrder();
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("room-page", Room);
