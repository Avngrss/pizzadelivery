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
    this.timerCount = null;

    this.state = {
      user: null,
      error: "",
      orderCart: [],
      products: [],
      isOpen: false,
      isLoading: false,
      totalPrice: 0,
      qty: 1,
    };
  }
  // setTimer() {
  //   const target_mili_sec = new Date("May 10, 2024 14:30:0").getTime();
  //   const timer = () => {
  //     const now_mili_sec = new Date().getTime();
  //     const remaining_sec = Math.floor((target_mili_sec - now_mili_sec) / 1000);

  //     const day = Math.floor(remaining_sec / (3600 * 24));
  //     const hour = Math.floor((remaining_sec % (3600 * 24)) / 3600);
  //     const min = Math.floor((remaining_sec % 3600) / 60);
  //     const sec = Math.floor(remaining_sec % 60);

  //     this.querySelector("#day").innerHTML = day;
  //     this.querySelector("#hour").innerHTML = hour;
  //     this.querySelector("#min").innerHTML = min;
  //     this.querySelector("#sec").innerHTML = sec;
  //   };

  //   setInterval(timer, 1000);
  // }
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
        const products = this.querySelector(".products");
        products.innerHTML = "Сервер не доступен";
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
  // openCart = (e) => {
  //   const cartHid = this.querySelector(".cart-hid");
  //   if (e.target.closest(".cart")) {
  //     cartHid.classList.remove("hidden");
  //     cartHid.classList.add("block");
  //     apiServes.get('/order').then(({ data }) => {
  //       this.setState({
  //         ...this.state,
  //         orderCart: mapResponseApiData(data),
  //       });
  //     })
  //   }
    
  // };
  // closeCart = (e) => {
  //   const cartHid = this.querySelector(".cart-hid");
  //   if (e.target.closest(".drawer-reject-trigger")) {
  //     cartHid.classList.remove("block");
  //     cartHid.classList.add("hidden");
  //   }
  // };
  addToCard = (e) => {
    if (e.target.closest(".add-to-cart")) {
      let id = e.target.dataset.id;
      let price = e.target.previousSibling.previousSibling.dataset.price;
      let title = e.target.parentElement.parentElement.dataset.title;
      let img = e.target.parentElement.parentElement.dataset.img;
      let qty = e.target.parentElement.parentElement.dataset.qty;
      const cartItems = { id, price, title, img, qty };
      apiServes.post('/order', cartItems)
      // const { setItem, getAllItems } = useCartStorage();
      this.setState({
        ...this.state,
        orderCart: this.state.orderCart.concat(cartItems),
        // totalPrice: this.getTotalPrice(cartItems),
      });
      
      // getAllItems();
      // setItem(id, cartItems);
    }
  };
  increaseCart(e) {
    if (e.target.closest(".plus")) {
      console.log("click");
      let id = e.target.parentElement.parentElement.dataset.id;
      let qty = e.target.previousSibling.previousSibling;
      let cartItems = {id, qty};
      // const { setItem, getAllItems } = useCartStorage();
      apiServes.post('/order', cartItems)
      // setItem(id, qty);
    }
  }
  // getTotalPrice(cartProducts) {
  //   let totalPrice = 0;
  //   orderCart.map((item) => {
  //     totalPrice = Number(item.price) + totalPrice;
  //   });

  //   return totalPrice;
  // }
  removeItemCard = ({ target }) => {
    const cartBtnDelete = target.closest(".delete-btn");
    if (cartBtnDelete) {
      let id = target.parentElement.parentElement.dataset.id;

      apiServes.delete('/order')
      // const { removeItem, getAllItems } = useCartStorage();
      // removeItem(id);
      // const cartProducts = getAllItems();

      this.setState({
        ...this.state,     
        // totalPrice: this.getTotalPrice(orderCart),
      });
    }
  };
  initializationCart() {
    const { getUser } = useUserStore();
    // const { getAllItems } = useCartStorage();
    // const cartProducts = getAllItems();
    this.setState({
      ...this.state,
      user: getUser(),
      // totalPrice: this.getTotalPrice(orderCart),
    });
  }

  componentDidMount() {
    // this.timerID = setTimeout(this.openSuggestModal, 3000);
    this.addEventListener("click", this.filterProducts);
    this.addEventListener("keyup", this.liveSearch);
    this.getProducts();
    this.addEventListener("click", this.getAllProducts);
    this.addEventListener("click", this.addToCard);
    // this.addEventListener("click", this.openCart);
    // this.addEventListener("click", this.closeCart);
    this.addEventListener("click", this.removeItemCard);
    this.addEventListener("click", this.increaseCart);
    this.initializationCart();
    // this.setTimer();
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.filterProducts);
    this.removeEventListener("keyup", this.liveSearch);
    this.getProducts();
    this.removeEventListener("click", this.getAllProducts);
    this.removeEventListener("click", this.addToCard);
    // this.removeEventListener("click", this.closeCart);
    this.removeEventListener("click", this.removeItemCard);
    clearTimeout(this.timerID);
  }
}

customElements.define("products-page", Products);
