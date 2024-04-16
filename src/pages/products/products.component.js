import { Component } from "../../core/Component";
import template from "./products.template.hbs";
import { ROUTES } from "../../constants/routes";
import { apiServes } from "../../services/Api";
import { mapResponseApiData } from "../../utils/api";
import { useModal } from "../../hooks/useModal";
import { useToastNotification } from "../../hooks/useToastNotification";

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
      error: "",
      products: [],
      isOpen: false,
      isLoading: false,
    };
  }

  openSuggestModal() {
    useModal({
      isOpen: true,
      template: "ui-suggest-modal",
      title: "Новинка!",
      successCaption: "Спешу попробовать!",
      className: "min-w-80",
      onSuccess() {},
    });
  }
  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };
  getProducts = () => {
    this.toggleIsLoading();
    apiServes
      .get("/products")
      .then(({ data }) => {
        this.setState({
          products: mapResponseApiData(data),
        });
      })
      .catch(() => {
        useToastNotification({ message: "Сервер не доступен" });
      });
    // .finally(() => {
    //   this.toggleIsLoading();
    // });
  };

  filterProducts = (e) => {
    const meats = this.querySelectorAll(".items");
    if (e.target.closest(".pizza-block")) {
      meats.forEach((item) => {
        if (!item.classList.contains("pizza")) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      });
    }
    if (e.target.closest(".drinks")) {
      meats.forEach((item) => {
        if (!item.classList.contains("drink")) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      });
    }
    if (e.target.closest(".desserts")) {
      meats.forEach((item) => {
        if (!item.classList.contains("dessert")) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      });
    }
    if (e.target.closest(".snacks")) {
      meats.forEach((item) => {
        if (!item.classList.contains("snack")) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      });
    }
  };

  liveSearch = (e) => {
    const searchValue = e.target.value.toUpperCase();
    const items = this.querySelectorAll(".items");
    const titles = this.querySelectorAll(".title");
    const products = this.querySelector(".products");

    for (let i = 0; i < titles.length; i++) {
      if (titles[i].innerHTML.toUpperCase().indexOf(searchValue) >= 0) {
        items[i].style.display = "block";
      } else {
        items[i].style.display = "none";
      }
    }
  };

  componentDidMount() {
    // this.timerID = setTimeout(this.openSuggestModal, 3000);
    this.addEventListener("click", this.filterProducts);
    this.addEventListener("keyup", this.liveSearch);
    this.getProducts();
  }

  componentWillUnmount() {
    this.addEventListener("click", this.filterProducts);
    this.addEventListener("keyup", this.liveSearch);
    this.getProducts();
    clearTimeout(this.timerID);
  }
}

customElements.define("products-page", Products);
