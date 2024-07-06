import { IPaymentFormUI } from "../../types/view/paymentForm";
import { IEvents } from "../base/events";
import { UIComponent } from "../base/view";

export class BasketUI extends UIComponent<IPaymentFormUI> {
  protected _paymentMethod:    HTMLElement;
  protected _adress:           HTMLElement;
  protected _button:           HTMLElement;  

  constructor(container:HTMLElement, protected settings:object, events: IEvents) {
    super(container, events)

    this._paymentMethod = container.querySelector(`${settings.classNameMethodButton}`)
    this._adress = container.querySelector(`${settings.classNameAdressInput}`)
    this._button = container.querySelector(`${settings.classNameButton}`)
  }

  set paymentMethod(mail:string) {
    /* ... */
  }

  set adress(phone:string) {
    /* ... */
  }

  
    /* ... */

}