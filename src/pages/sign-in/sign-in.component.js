import { Component } from "../../core/Component";
import template from "./sign-in.template.hbs";
import { ROUTES } from "../../constants/routes";
import { authService } from "../../services/Auth";
import { extractFormData } from "../../utils/extractFormData";
import { TOAST_TYPE } from "../../constants/toast";
import { useNavigate } from "../../hooks/useNavigate";
import { useUserStore } from "../../hooks/useStoreUser";
import { useToastNotification } from "../../hooks/useToastNotification";

export class SignIn extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      errors: {
        email: "",
        password: "",
      },
      isLoading: false,
    };
  }

  toggleIsLoading = () => {
    this.setState({
      ...this.state,
      isLoading: !this.state.isLoading,
    });
  };

  validateField = ({ target }) => {
    if (target.value === "") {
      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          [target.name]: "empty",
        },
      });
    }
  };

  signInUser = (evt) => {
    evt.preventDefault();
    const { setUser } = useUserStore();
    const formData = extractFormData(evt.target);
    this.toggleIsLoading();
    authService
      .signIn(formData.email, formData.password)
      .then((data) => {
        setUser({ ...data.user });
        useToastNotification({
          message: "Успешный вход",
          type: TOAST_TYPE.success,
        });
        useNavigate(ROUTES.products);
      })
      .catch(() => {
        useToastNotification({ message: "Неправильный логин или пароль" });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  };

  signInGoogle = (evt) => {
    evt.preventDefault();
    this.toggleIsLoading();
    authService
      .signInWitchGoogle()
      .then(() => {
        useToastNotification({
          message: "Успешный вход",
          type: TOAST_TYPE.success,
        });
        useNavigate(ROUTES.products);
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  };

  componentDidMount() {
    this.addEventListener("submit", this.signInUser);
    this.addEventListener("submit", this.signInGoogle);
    this.addEventListener("change", this.validateField);
  }
  componentWillUnmount() {
    this.removeEventListener("submit", this.signInUser);
    this.removeEventListener("submit", this.signInGoogle);
    this.removeEventListener("change", this.validateField);
  }
}

customElements.define("signin-page", SignIn);
