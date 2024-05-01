import { Component } from "../../core/Component";
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
  getTotalPrice(arr) {
    return arr.reduce((prev, current) => (prev += Number(current.price) * current.qty), 0);
  }
  deleteItem = async ({ target }) => {
    const cartBtnDelete = target.closest(".delete-btn");
    if (cartBtnDelete) {
      let id = target.parentElement.parentElement.dataset.id;
      await apiServes.delete(`/order/${id}`);
      const { data } = await apiServes.get("/order");
      const result = mapResponseApiData(data ?? {});
      this.setState({
        ...this.state,
        data: result,
        totalPrice: this.getTotalPrice(result),
      });
    }
  };
  increaseItem = async ({ target }) => {
    if (target.closest(".plus")) {
      let id = target.parentElement.parentElement.dataset.id;
      const item = this.state.data.find((item) => item.id === id)
      await apiServes.patch(`/order/${id}`, { qty:  Number(item?.qty ?? 0) + 1});
      const { data } = await apiServes.get("/order");
      const result = mapResponseApiData(data ?? {});
      this.setState({
        ...this.state,
        data: result,
        totalPrice: this.getTotalPrice(result),
      });
    }
  };
  decreaseItem = async ({ target }) => {
    if (target.closest(".minus")) {
      let id = target.parentElement.parentElement.dataset.id;
      const item = this.state.data.find((item) => item.id === id)
      await apiServes.patch(`/order/${id}`, { qty:  Number(item?.qty ?? 0) - 1});
      const { data } = await apiServes.get("/order");
      const result = mapResponseApiData(data ?? {});
      this.setState({
        ...this.state,
        data: result,
        totalPrice: this.getTotalPrice(result),
      });
    }
  };
  async init() {
    try {
      const { getUser } = useUserStore();
      const { data } = (await apiServes.get("/order"));
      const result = mapResponseApiData(data);
      this.setState({
        ...this.state,
        user: getUser(),
        data: result,
        totalPrice: this.getTotalPrice(result),
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.init();
    this.addEventListener("click", this.deleteItem);
    this.addEventListener("click", this.increaseItem);
    this.addEventListener("click", this.decreaseItem);
  }

  componentWillUnmount() {
    this.init();
    this.removeEventListener("click", this.deleteItem);
    this.removeEventListener("click", this.increaseItem);
    this.removeEventListener("click", this.decreaseItem);
  }
}

customElements.define("ui-cart-form", OrderForm);
