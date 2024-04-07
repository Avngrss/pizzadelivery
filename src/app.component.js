import { Component } from "./core/Component";
import template from "./app.template.hbs";
import { ROUTES } from "./constants/routes";
import { useUserStore } from "./hooks/useStoreUser";
import { authService } from "./services/Auth";
import { useToastNotification } from "./hooks/useToastNotification";

//Core app
import "./core/Router";
//pages
import "./pages/products/products.component";
import "./pages/home/home.component";
import "./pages/not-found/not-found.component";
import "./pages/cart/cart.component";
import "./pages/contacts/contacts.component";
import "./pages/sign-in/sign-in.component";
import "./pages/sign-up/sign-up.components";
import "./pages/room/room.component";
//Components
import "./components/toast/toast.component";
import "./components/input/input.component";
import "./components/button/button.component";
import "./components/loader/loader.component";
import "./components/menu/menu.component";
import "./components/logo/logo.component";
import "./components/footer/footer.component";

export class App extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      isLoading: false,
    };
  }
  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  initializeApp() {
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    authService
      .authorizeUser()
      .then((user) => {
        setUser(user.uid ? user : null);
      })
      .catch((error) => {
        useToastNotification({ message: error.message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  }

  componentDidMount() {
    this.initializeApp();
  }
}

customElements.define("my-app", App);
