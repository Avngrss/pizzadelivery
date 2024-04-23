import { Component } from "../../core/Component";
import template from "./sigh-up.template.hbs";
import { ROUTES } from "../../constants/routes";
import { extractFormData } from "../../utils/extractFormData";
import { authService } from "../../services/Auth";
import { useToastNotification } from "../../hooks/useToastNotification";
import { TOAST_TYPE } from "../../constants/toast";
import { useNavigate } from "../../hooks/useNavigate";
import { useUserStore } from "../../hooks/useStoreUser";

export class SignUp extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      errors: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
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

  registerUser = (evt) => {
    evt.preventDefault();
    const { email, password, ...rest } = extractFormData(evt.target);
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    authService
      .signUp(email, password)
      .then(() => {
        authService.updateUserProfile(rest).then(() => {
          setUser({ ...authService.getCurrentUser() });
          useToastNotification({
            message: "Успешный вход",
            type: TOAST_TYPE.success,
          });
          useNavigate(ROUTES.products);
        });
      })
      .catch(() => {
        useToastNotification({ message: "Пожалуйста, заполните все поля" });
      })
      .finally(() => {
        this.toggleIsLoading();
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

  componentDidMount() {
    this.addEventListener("submit", this.registerUser);
    this.addEventListener("change", this.validateField);
  }
  componentWillUnmount() {
    this.removeEventListener("submit", this.registerUser);
    this.removeEventListener("change", this.validateField);
  }
}

customElements.define("signup-page", SignUp);
