import { Component } from "../../core/Component";
import template from "./modal.template.hbs";
import { eventEmitter } from "../../core/EventEmitter";
import { EVENT_TYPES } from "../../constants/eventTypes";
import { initialState } from "./initialState";

export class Modal extends Component {
  constructor() {
    super();
    this.template = template({});

    this.state = initialState;
  }

  appendTemplate = (template) => {
    const tmp = document.createElement(template);
    this.querySelector(".modal-body").append(tmp);
  };

  modalHandler = ({ detail }) => {
    this.setState({
      ...this.state,
      ...detail,
    });

    if (detail.template) {
      this.appendTemplate(detail.template);
    }
  };

  closeModal = () => {
    this.setState(initialState);
  };

  onSuccess = () => {
    this.state.onSuccess(this);
    this.closeModal();
  };

  onClick = (e) => {
    if (e.target.matches(".modal-success")) {
      this.onSuccess();
    }
    if (e.target.matches(".modal-close ")) {
      this.closeModal();
    }
  };

  componentDidMount() {
    eventEmitter.on(EVENT_TYPES.modal, this.modalHandler);
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    eventEmitter.off(EVENT_TYPES.modal, this.modalHandler);
    this.removeEventListener("click", this.onClick);
  }
}

customElements.define("ui-modal", Modal);
