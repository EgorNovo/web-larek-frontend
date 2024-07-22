import { IContantFormUI } from "../../types/view/contantForm";
import { IEvents } from "../base/events";
import { Form } from "../common/Form";


export class ContactFormUI extends Form<IContantFormUI> {
  constructor(container:HTMLFormElement, protected events: IEvents) {
    super(container, events)
  }

  set email(email:string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value = email;
  }

  set phone(phone:string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = phone;
  }
}