import { Component } from "../../core/Component";
import template from "./room.template.hbs";
import { ROUTES } from "../../constants/routes";

export class Room extends Component {
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
}

customElements.define("room-page", Room);
