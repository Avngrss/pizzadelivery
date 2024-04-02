import { Component } from "../../core/Component";
import template from "./sigh-up.template.hbs";
import { ROUTES } from "../../constants/routes";
import { extractFormData } from "../../utils/extractFormData";
import { authService } from "../../services/Auth";
import { useToastNotification } from "../../hooks/useToastNotification";
import { TOAST_TYPE } from "../../constants/toast";
import { useNavigate } from "../../hooks/useNavigate";

export class SignUp extends Component {
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

  registerUser = (e) => {
    e.preventDefault();
    const formData = extractFormData(e.target);
    this.toggleIsLoading();
    authService
      .signUp(formData.email, formData.password)
      .then((data) => {
        console.log(data);
        useToastNotification({
          message: "Success!",
          type: TOAST_TYPE.success,
        });
        useNavigate(ROUTES.dashboard);
      })
      .catch((error) => {
        useToastNotification({
          message: error.message,
        });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  };

  componentDidMount() {
    this.addEventListener("submit", this.registerUser);
  }
  componentWillUnmount() {
    this.removeEventListener("submit", this.registerUser);
  }
}

customElements.define("signup-page", SignUp);
