import { Component } from "../../core/Component";
import "../../components/router-link.component";
import template from "./contacts.template.hbs";
import { ROUTES } from "../../constants/routes";

export class ContactsPage extends Component {
  constructor() {
    super();
    this.template = template({
      routes: ROUTES,
    });
  }
}

customElements.define("contacts-page", ContactsPage);
