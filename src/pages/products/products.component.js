import { Component } from "../../core/Component";
import template from "./products.template.hbs";
import { ROUTES } from "../../constants/routes";
import { apiServes } from "../../services/Api";
import { mapResponseApiData } from "../../utils/api";
import { useModal } from "../../hooks/useModal";
import { useToastNotification } from "../../hooks/useToastNotification";
import { useCartStorage } from "../../hooks/useCartStorage";
import { useUserStore } from "../../hooks/useStoreUser";

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
      user: null,
      error: "",
      cartProducts: [],
      products: [],
      isOpen: false,
      isLoading: false,
      totalPrice: 0,
      qty: 1,
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
      })
      .finally(() => {
        this.toggleIsLoading();
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
      const cartItems = [{ id, price, title, img, qty }];
      const { setItem, getAllItems } = useCartStorage();
      this.setState({
        ...this.state,
        cartProducts: this.state.cartProducts.concat(cartItems),
        totalPrice: this.getTotalPrice(cartItems),
      });
      getAllItems();
      setItem(id, cartItems);
      text.classList.add("bg-green-300");
      text.textContent = "В корзине";
    }
  };

  increaseCart(e) {
    if (e.target.closest(".plus")) {
      console.log("click");
      let id = e.target.parentElement.parentElement.dataset.id;
      let qty = e.target.previousSibling.previousSibling;
      const { setItem, getAllItems } = useCartStorage();
      setItem(id, qty);
    }
  }

  getTotalPrice(cartProducts) {
    let totalPrice = 0;
    cartProducts.map((item) => {
      totalPrice = Number(item.price) + totalPrice;
    });

    return totalPrice;
  }
  removeItemCard = ({ target }) => {
    const cartBtnDelete = target.closest(".delete-btn");
    if (cartBtnDelete) {
      let id = target.parentElement.parentElement.dataset.id;
      console.log(id);
      const { removeItem, getAllItems } = useCartStorage();
      removeItem(id);
      const cartProducts = getAllItems();

      this.setState({
        ...this.state,
        cartProducts,
        totalPrice: this.getTotalPrice(cartProducts),
      });
    }
  };

  initializationCart() {
    const { getUser } = useUserStore();

    const { getAllItems } = useCartStorage();
    const cartProducts = getAllItems();
    this.setState({
      ...this.state,
      user: getUser(),
      cartProducts,
      totalPrice: this.getTotalPrice(cartProducts),
    });
  }

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
    this.addEventListener("click", this.increaseCart);
    this.initializationCart();
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
    clearTimeout(this.timerID);
  }
}

customElements.define("products-page", Products);
