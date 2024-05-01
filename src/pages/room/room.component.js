import { Component } from "../../core/Component";
import template from "./room.template.hbs";
import { useModal } from "../../hooks/useModal";
import { useToastNotification } from "../../hooks/useToastNotification";
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
      totalPrice: 0,
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
      onSuccess: () => {
        const { getUser } = useUserStore()
        const body = document.querySelector(".order-body");
        useToastNotification({
          message: "Ваше сообщение получено. В скором времени с вами свяжутся",
          type: TOAST_TYPE.success,
        });
        body.innerHTML = "Вы еще ничего не заказали";
        
        apiServes.delete("/order").then(({data}) => {
         this.setState({
          ...this.state,
          cart: data,
          user: getUser(),
          totalPrice: 0,
         })
        }).catch((error) => {
          console.log(error);
        })
      },
    });
  }
  onClick = ({ target }) => {
    const { getUser } = useUserStore()
    if (target.closest(".order")) {
      this.openOrderModal();
    }
    if (target.closest(".clear")) {
      this.toggleIsLoading()
      const body = document.querySelector(".order-body");
      apiServes.delete("/order").then(() => {
        apiServes.get("/order").then(({ data }) => {
          this.setState({
            ...this.state,
            cart: data,
            totalPrice: 0,
            user: getUser()
          });
        }).finally(() => {
          this.toggleIsLoading()
        })
      });
      body.innerHTML = "Вы еще ничего не заказали";
    }
  };
  getTotalPrice(arr) {
    return arr.reduce((prev, current) => (prev += Number(current.price) * current.qty), 0);
  }
   init = async() => {
    this.toggleIsLoading()
    try {
      const { getUser } = useUserStore();
      const { data } = await apiServes.get("/order");
      const result = mapResponseApiData(data);
      this.setState({
        ...this.state,
        user: getUser(),
        cart: result,
        totalPrice: this.getTotalPrice(result),
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.toggleIsLoading()
    }
  }
  componentDidMount() {
    this.init();
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("room-page", Room);
