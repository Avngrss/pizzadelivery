import { Component } from "../../core/Component";
import template from "./products.template.hbs";
import { ROUTES } from "../../constants/routes";
import { apiServes } from "../../services/Api";
import { mapResponseApiData } from "../../utils/api";
import { useModal } from "../../hooks/useModal";
import { useToastNotification } from "../../hooks/useToastNotification";
import { storageService } from "../../services/Storage";

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
      cartProduct: [],
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
          ...this.state,
          products: mapResponseApiData(data),
        });
      })
      .catch(() => {
        useToastNotification({ message: "Сервер не доступен" });
      });
  };
  filterProducts = (e) => {
    const products = this.querySelectorAll(".items");
    if (e.target.closest(".pizza-block")) {
      console.log("click");
      products.forEach((item) => {
        if (!item.classList.contains("pizza")) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      });
    }
    if (e.target.closest(".drinks")) {
      products.forEach((item) => {
        if (!item.classList.contains("drink")) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      });
    }
    if (e.target.closest(".desserts")) {
      products.forEach((item) => {
        if (!item.classList.contains("dessert")) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      });
    }
    if (e.target.closest(".snacks")) {
      products.forEach((item) => {
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
  openCart = (e) => {
    const cartHid = this.querySelector(".cart-hid");
    if (e.target.closest(".cart")) {
      cartHid.classList.remove("hidden");
      cartHid.classList.add("block");
    }
  };
  closeCart = (e) => {
    const cartHid = this.querySelector(".cart-hid");
    if (e.target.closest(".drawer-reject-trigger")) {
      cartHid.classList.remove("block");
      cartHid.classList.add("hidden");
    }
  };
  addToCard = (e) => {
    if (e.target.closest(".add-to-cart")) {
      let id = e.target.dataset.id;
      let price = e.target.previousSibling.previousSibling.dataset.price;
      let title = e.target.parentElement.parentElement.dataset.title;
      let img = e.target.parentElement.parentElement.dataset.img;
      let qty = e.target.parentElement.parentElement.dataset.qty;
     const cartProduct = [{ id, price, title, img, qty }];
      this.setState({
        ...this.state,
        cartProduct: this.state.cartProduct.concat(cartProduct),
      });
    }
  };
  removeItemCard = (e) => {
    if (e.target.closest(".delete-btn")) {
      this.setState({
        ...this.state,
        cartProduct: this.state.cartProduct.filter((item) => {
          item.id != item.id;
          storageService.removeItem("products");
        }),
      });
    }
  };

  // updateCart = () => {
  //   this.calcSubtotalPrice();
  // };
  componentDidMount() {
    // this.timerID = setTimeout(this.openSuggestModal, 3000);
    this.addEventListener("click", this.filterProducts);
    this.addEventListener("keyup", this.liveSearch);
    this.getProducts();
    this.addEventListener("click", this.getAllProducts);
    this.addEventListener("click", this.addToCard);
    this.addEventListener("click", this.openCart);
    this.addEventListener("click", this.closeCart);
    this.addEventListener("click", this.removeItemCard);
    // this.updateCart();
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.filterProducts);
    this.removeEventListener("keyup", this.liveSearch);
    this.getProducts();
    this.removeEventListener("click", this.getAllProducts);
    this.removeEventListener("click", this.addToCard);
    this.removeEventListener("click", this.openCart);
    this.removeEventListener("click", this.closeCart);
    this.removeEventListener("click", this.removeItemCard);
    // this.updateCart();
    clearTimeout(this.timerID);
  }
}

customElements.define("products-page", Products);
