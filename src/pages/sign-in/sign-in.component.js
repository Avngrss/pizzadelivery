import { Component } from "../../core/Component";
import template from "./sign-in.template.hbs";
import { ROUTES } from "../../constants/routes";
import { authService } from "../../services/Auth";
import { extractFormData } from "../../utils/extractFormData";
import { TOAST_TYPE } from "../../constants/toast";
import { useNavigate } from "../../hooks/useNavigate";
import { useUserStore } from "../../hooks/useStoreUser";
import { useToastNotification } from "../../hooks/useToastNotification";
import { validateIsNotEmptyFields } from "../../utils/validateIsNotEmptyFields";
import { validatePasswordLength } from "../../utils/validatePasswordLength";

export class SignIn extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
    this.state = {
      isValidateError: false,
      inputs: {
        email: {
          value: "",
          error: "",
        },
        password: {
          value: "",
          error: "",
        },
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

  signInUser = (formData) => {
    this.toggleIsLoading();
    const { setUser } = useUserStore();
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

    if (!this.state.isValidateError) this.signInUser(formData);
  };

  // signInGoogle = (e) => {
  //   e.preventDefault();
  //   if (e.target.closest(".btn-google")) {
  //     this.toggleIsLoading();
  //     authService
  //       .signInWitchGoogle()
  //       .then(() => {
  //         useToastNotification({
  //           message: "Успешный вход",
  //           type: TOAST_TYPE.success,
  //         });
  //         useNavigate(ROUTES.products);
  //       })
  //       .finally(() => {
  //         this.toggleIsLoading();
  //       });
  //   }
  // };

  componentDidMount() {
    this.addEventListener("submit", this.onSubmit);
    // this.addEventListener("click", this.signInGoogle);
    // this.addEventListener("change", this.validateField);
  }
  componentWillUnmount() {
    this.removeEventListener("submit", this.onSubmit);
    // this.removeEventListener("click", this.signInGoogle);
    // this.removeEventListener("change", this.validateField);
  }
}

customElements.define("signin-page", SignIn);
