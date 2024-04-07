import { Component } from "../../core/Component";
import template from "./products.template.hbs";
import { ROUTES } from "../../constants/routes";
import { apiServes } from "../../services/Api";
import { mapResponseApiData } from "../../utils/api";

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

    this.state = {
      products: [],
      productsCatalog: "",
    };
  }

  // renderProducts = () => {
  //   apiServes.get("/products").then(({ data }) =>
  //     this.setState({
  //       products: mapResponseApiData(data).map((item) => {
  //         const wrap = this.querySelector(".products");
  //         let newProduct = document.createElement("div");
  //         newProduct.innerHTML = `
  //             <div>${item.title}</div>
  //             <div>${item.price}</div>
  //             <div>${item.description}</div>`;
  //         wrap.append(newProduct);
  //         console.log(item);
  //         console.log(wrap);
  //       }),
  //     })
  //   );
  // };

  renderProducts2 = () => {
    apiServes.get("/products").then(({ data }) => {
      console.log(mapResponseApiData(data));
    });
  };

  componentDidMount() {
    // this.renderProducts();
    this.renderProducts2();
  }

  componentWillUnmount() {
    // this.renderProducts();
    this.renderProducts2();
  }
}

customElements.define("products-page", Products);
