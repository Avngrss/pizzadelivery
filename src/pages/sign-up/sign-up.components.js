import { Component } from "../../core/Component";
import template from "./sigh-up.template.hbs";
import { ROUTES } from "../../constants/routes";
import { extractFormData } from "../../utils/extractFormData";
import { authService } from "../../services/Auth";
import { useToastNotification } from "../../hooks/useToastNotification";
import { TOAST_TYPE } from "../../constants/toast";
import { useNavigate } from "../../hooks/useNavigate";
import { useUserStore } from "../../hooks/useStoreUser";
import { apiServes } from '../../services/Api'

export class SignUp extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      email: {
        value: "",
        error: "",
      },
      password: {
        value: "",
        error: "",
      },
      name: {
        value: "",
        error: "",
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

  signUpUser = (e) => {
    const { email, password, ...rest } = extractFormData(e.target);
    this.toggleIsLoading();
    const { setUser } = useUserStore();
    authService
      .signUp(email, password)
      .then(() => {
        authService.updateUserProfile(rest).then(() => {
          setUser({ ...authService.getCurrentUser() });
          apiServes.post('/users', authService.getCurrentUser())
          useToastNotification({
            message: "Успешная регистрация",
            type: TOAST_TYPE.success,
          });
          useNavigate(ROUTES.products);
        });
      })
      .catch(() => {
        useToastNotification({
          message: "Пожалуйста,заполните все поля",
          type: TOAST_TYPE.error,
        });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  };

  componentDidMount() {
    this.addEventListener("submit", this.signUpUser);
  }

  componentWillUnmount() {
    this.removeEventListener("submit", this.signUpUser);
  }
}

customElements.define("signup-page", SignUp);
