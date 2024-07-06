import { IContantFormUI } from "../../types/view/contantForm";
import { IEvents } from "../base/events";
import { UIComponent } from "../base/view";

export class ContactFormUI extends UIComponent<IContantFormUI> {
  protected _mail:    HTMLElement;
  protected _phone:   HTMLElement;
  protected _button:  HTMLElement;

  constructor(container:HTMLElement, protected settings:object, events: IEvents) {
    super(container, events)

    this._mail = container.querySelector(`${settings.classNameMailInput}`)
    this._phone = container.querySelector(`${settings.classNamePhoneInput}`)
    this._button = container.querySelector(`${settings.classNameButton}`)
  }

  set mail(mail:string) {
    /* ... */
  }

  set phone(phone:string) {
    /* ... */
  }


    /* ... */

}