import { IBasketUI } from "../../types/view/basket";
import { IEvents } from "../base/events";
import { UIComponent } from "../base/view";

export class BasketUI extends UIComponent<IBasketUI> {
  protected _list:    HTMLElement;
  protected _price:   HTMLElement;
  protected _button:  HTMLElement;

  constructor(container:HTMLElement, protected settings:object, events: IEvents) {
    super(container,events)

    this._list = container.querySelector(`${settings.classNameList}`)
    this._price = container.querySelector(`${settings.classNamePriceParagraph}`)
    this._button = container.querySelector(`${settings.classNameButton}`)
  }

  set price(price:string) {
    super.setTextConten(this._price, price);
  }

  set list(li:HTMLElement[]) {
    Array.from(li).forEach( e => this._list.appendChild(e))
  }

  dissableButton() {
    /* Какой-то код */
    super.toggleDisabled;
  }

  /* ...  */
}