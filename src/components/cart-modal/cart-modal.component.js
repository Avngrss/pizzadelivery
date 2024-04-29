import { Component } from "../../core/Component";
import { useToastNotification } from "../../hooks/useToastNotification";
import { apiServes } from "../../services/Api";
import { mapResponseApiData } from "../../utils/api";
import template from "./cart-modal.template.hbs";
import { useUserStore } from "../../hooks/useStoreUser";
import { ROUTES } from "../../constants/routes";

export class OrderForm extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      data: [],
      user: null,
      totalPrice: 0,
    };
  }

  deleteItem = ({ target }) => {
    const cartBtnDelete = target.closest(".delete-btn");
    if (cartBtnDelete) {
      let id = target.parentElement.parentElement.dataset.id;
      apiServes.delete("/order", { id }).then(() => {
        apiServes.get("/order").then(({ data }) => {
          this.setState({
            data: data,
            totalPrice: this.getPrice(this.state.data),
          });
        });
      });
    }
  };

  increaseItem = ({ target }) => {
    if (target.closest(".plus")) {
      let id = target.parentElement.parentElement.dataset.id;
      this.setState({
        data: this.state.data.map((item) => {
          if (id == item.id) {
            return {
              ...item,
              qty: Number(item.qty) + 1,
              price: Number(item.price) + Number(item.price),
            };
          } else {
            return item;
          }
        }),
        totalPrice: this.getPrice(this.state.data),
      });
    }
  };

  decreaseItem = ({ target }) => {
    if (target.closest(".minus")) {
      let id = target.parentElement.parentElement.dataset.id;
      this.setState({
        data: apiServes.post(
          "/order",
          this.state.data.map((item) => {
            if (id == item.id) {
              return {
                ...item,
                qty: Number(item.qty) - 1,
                price: Number(item.price) - Number(item.price),
              };
            } else {
              return item;
            }
          })
        ),
        totalPrice: this.getPrice(this.state.data),
      });
    }
  };

  getPrice(arr) {
    let totalPrice = 0;
    arr.map((item) => {
      totalPrice = Number(item.price) + totalPrice;
    });
    return totalPrice;
  }

  async init() {
    try {
      const { setUser } = useUserStore();
      const { data } = (await apiServes.get("/order")) ?? [];
      console.log(mapResponseApiData(data));
      this.setState({
        user: setUser(),
        data: mapResponseApiData(data),
      });
    } catch ({ message }) {
      useToastNotification({ message });
    }
  }

  componentDidMount() {
    this.init();
    this.addEventListener("click", this.deleteItem);
    this.addEventListener("click", this.increaseItem);
    this.addEventListener("click", this.decreaseItem);
  }
}

customElements.define("ui-cart-form", OrderForm);
