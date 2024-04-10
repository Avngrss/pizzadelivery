import { Component } from "../../core/Component";
import template from "./products.template.hbs";
import { ROUTES } from "../../constants/routes";
import { apiServes } from "../../services/Api";
import { mapResponseApiData } from "../../utils/api";

// import { DATA } from "./products";

//Swiper-slider
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

import "./products.css";

export class Products extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.timerID = null;
    this.state = {
      products: [],
      isOpen: false,
    };
  }

  getProducts = () => {
    apiServes.get("/products").then(({ data }) => {
      this.setState({
        products: mapResponseApiData(data),
      });
    });
  };

  componentDidMount() {
    // this.addEventListener("click", this.onClick);
    this.getProducts();
  }

  componentWillUnmount() {
    // this.addEventListener("click", this.onClick);
    this.getProducts();
  }
}

customElements.define("products-page", Products);
