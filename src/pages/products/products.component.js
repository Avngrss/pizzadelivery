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
    // this.wrap = this.querySelector(".products");
    this.template = template({
      routes: ROUTES,
    });

    this.state = {
      products: [],
      productsCatalog: "",
    };
  }

  // onClick = ({ target }) => {
  //   if (target.closest(".create")) {
  //     DATA.forEach((item) => {
  //       apiServes.post("/products", item);
  //     });
  //   }
  // };

  getProducts = () => {
    apiServes.get("/products").then(({ data }) => {
      this.setState({
        products: mapResponseApiData(data),
      });
    });
  };

  // renderProducts = () => {
  //   this.setState({
  //     products: mapResponseApiData(data).forEach((item) => {
  //       const newProduct = `
  //           <div>${item.title}</div>
  //           <div>${item.price}</div>
  //           <div>${item.description}</div>`;
  //     }),
  //   });
  // };

  componentDidMount() {
    // this.addEventListener("click", this.onClick);
    this.getProducts();
    // this.renderProducts();
  }

  componentWillUnmount() {
    // this.addEventListener("click", this.onClick);
    this.getProducts();
    // this.renderProducts();
  }
}

customElements.define("products-page", Products);
