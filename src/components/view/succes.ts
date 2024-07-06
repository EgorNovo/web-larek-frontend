import { ISuccesUI } from "../../types/view/succes";
import { IEvents } from "../base/events";
import { UIComponent } from "../base/view";

export class BasketUI extends UIComponent<ISuccesUI> {
  protected _button:    HTMLElement;
  protected _message:   HTMLElement;

  constructor(container:HTMLElement, protected settings:object, events: IEvents) {
    super(container, events)

    this._button = container.querySelector(`${settings.classNameButton}`)
    this._message = container.querySelector(`${settings.classNameMessage}`)

  }

  set mesage(message:string) {
    super.setTextConten(this._message, "Заказ успешно оформлен")
  }

  /* ... */
}