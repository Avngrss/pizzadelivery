import { Component } from "../../core/Component";
import template from "./sigh-up.template.hbs";
import { ROUTES } from "../../constants/routes";
import { extractFormData } from "../../utils/extractFormData";
import { authService } from "../../services/Auth";
import { useToastNotification } from "../../hooks/useToastNotification";
import { TOAST_TYPE } from "../../constants/toast";
import { useNavigate } from "../../hooks/useNavigate";
import { useUserStore } from "../../hooks/useStoreUser";
import { validateIsNotEmptyFields } from "../../utils/validateIsNotEmptyFields";
import { validatePasswordLength } from "../../utils/validatePasswordLength";

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

  signUpUser = (formData) => {
    this.toggleIsLoading();

    const { setUser } = useUserStore();

    authService
      .signUp(formData.email, formData.password)
      .then((data) => {
        setUser({ ...data.user });
        useToastNotification({
          message: "Успешная регистрация",
          type: TOAST_TYPE.success,
        });
        useNavigate(ROUTES.products);
      })
      .catch(({ message }) => {
        useToastNotification({ message });
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const formData = extractFormData(e.target);
    const validationRules = [validateIsNotEmptyFields, validatePasswordLength];

    this.state.isValidateError = false;

    for (const rule of validationRules) {
      if (this.state.isValidateError) break;
      rule(formData, (key, value, error) => {
        this.setState(
          Object.assign(this.state, {
            inputs: {
              ...this.state.inputs,
              [key]: {
                value: value,
                error: error,
              },
            },
          })
        );
        if (error) this.state.isValidateError = true;
      });
    }

    if (!this.state.isValidateError) this.signUpUser(formData);
  };

  componentDidMount() {
    this.addEventListener("submit", this.onSubmit);
  }

  componentWillUnmount() {
    this.removeEventListener("submit", this.onSubmit);
  }
}

customElements.define("signup-page", SignUp);
