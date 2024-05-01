import { Component } from "../../core/Component";
import template from "./footer.template.hbs";
import { useToastNotification } from "../../hooks/useToastNotification";
import { useModal } from "../../hooks/useModal";
import { extractFormData } from "../../utils/extractFormData";
import { TOAST_TYPE } from "../../constants/toast";

export class Footer extends Component {
  constructor() {
    super();
    this.timerID = null;
    this.template = template();
    this.state = {
      isOpen: false,
    };
  }

  openCallModal() {
    useModal({
      isOpen: true,
      showBtn: true,
      template: "ui-call-form",
      successBtn: true,
      successCaption: "Заказать звонок",
      rejectCaption: "Отменить",
      title: "Заказать звонок",
      onSuccess: (modal) => {
        const form = modal.querySelector(".call-form");
        const formData = extractFormData(form);
        console.log(formData);
        useToastNotification({
          message: "Ваше сообщение получено. В скором времени с вами свяжутся",
          type: TOAST_TYPE.success,
        });
      },
    });
  }

  onClick = ({ target }) => {
    if (target.closest(".order-call")) {
      this.openCallModal();
    }
  };

  componentDidMount() {
    this.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    this.removeEventListener("click", this.onClick);
    clearTimeout(this.timerID);
  }
}

customElements.define("ui-footer", Footer);
