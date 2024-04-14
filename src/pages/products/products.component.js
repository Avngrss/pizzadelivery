import { Component } from "../../core/Component";
import template from "./products.template.hbs";
import { ROUTES } from "../../constants/routes";
import { apiServes } from "../../services/Api";
import { mapResponseApiData } from "../../utils/api";

import { DATA } from "./products";

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

  onClick = (e) => {
    if (e.target.closest(".create")) {
      DATA.forEach((item) => {
        apiServes.post("/pizza", item);
      });
    }
  };

  getProducts = () => {
    apiServes.get("/pizza").then(({ data }) => {
      this.setState({
        products: mapResponseApiData(data),
      });
    });
  };

  filterProducts = (e) => {
    const meats = this.querySelectorAll(".pizza");
    if (e.target.closest(".all")) {
      meats.forEach((item) => {
        item.style.display = "block";
      });
    }
    if (e.target.closest(".meat")) {
      meats.forEach((item) => {
        if (!item.classList.contains("meat")) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      });
    }
    if (e.target.closest(".barbecue")) {
      meats.forEach((item) => {
        if (!item.classList.contains("barbecue")) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      });
    }
    if (e.target.closest(".another")) {
      meats.forEach((item) => {
        if (!item.classList.contains("another")) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      });
    }
  };

  liveSearch = (e) => {
    const searchValue = e.target.value.toUpperCase();
    const items = this.querySelectorAll(".pizza");
    const titles = this.querySelectorAll(".title");

    for (let i = 0; i < titles.length; i++) {
      if (titles[i].innerHTML.toUpperCase().indexOf(searchValue) >= 0) {
        items[i].style.display = "";
      } else {
        items[i].style.display = "none";
      }
    }
  };

  componentDidMount() {
    // this.addEventListener("click", this.onClick);
    this.addEventListener("click", this.filterProducts);
    this.addEventListener("input", this.liveSearch);
    this.getProducts();
  }

  componentWillUnmount() {
    // this.addEventListener("click", this.onClick);
    this.addEventListener("click", this.filterProducts);
    this.addEventListener("input", this.liveSearch);
    this.getProducts();
  }
}

customElements.define("products-page", Products);
