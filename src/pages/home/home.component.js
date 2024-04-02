import { Component } from "../../core/Component";
import "../../components/router-link.component";
import template from "./home.template.hbs";
import { ROUTES } from "../../constants/routes";

export class HomePage extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
  }

  checkElem = (e) => {
    if (e.target.matches("input")) {
      console.log(e.target.value);
    }
  };

  componentDidMount() {
    this.addEventListener("click", this.checkElem);
  }
  componentWillUnmount() {
    this.removeEventListener("click", this.checkElem);
  }
}

customElements.define("home-page", HomePage);
