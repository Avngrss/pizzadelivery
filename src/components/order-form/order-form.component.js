import { Component } from "../../core/Component";
import template from "./order-form.template.hbs";
import { useUserStore } from '../../hooks/useStoreUser';
import { apiServes } from '../../services/Api';
import { useToastNotification } from '../../hooks/useToastNotification';
import { mapResponseApiData } from "../../utils/api";

export class OrderForm extends Component {
  constructor() {
    super();

    this.template = template();
    this.state = {
      data: [],
      totalPrice: 0
    };
  }
  getTotalPrice(arr) {
    return arr.reduce((prev, current) => (prev += Number(current.price) * current.qty), 0);
  }

  async init() {
    try {
      const { getUser } = useUserStore();
      const { data } = (await apiServes.get("/order"));
      const result = mapResponseApiData(data);
      this.setState({
        ...this.state,
        user: getUser(),
        data: result,
        totalPrice: this.getTotalPrice(result)
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.init();
  }
}

customElements.define("ui-order-form", OrderForm);
