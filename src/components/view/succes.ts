import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { UIComponent } from "../base/view";

export interface ISuccesUI {
  text: string
}

export class SuccesUI extends UIComponent<ISuccesUI> {
  protected _button:    HTMLElement;
  protected _message:   HTMLElement;

  constructor(container:HTMLElement, protected events: IEvents) {
    super(container)

    this._button  = ensureElement<HTMLElement>('.order-success__close', container);
    this._message = ensureElement<HTMLElement>('.order-success__description', container);

    this._button.addEventListener('click', () => {
      this.events.emit('succes:close');
    })
  }

  set message( totalPrice:string ) {
    this.setTextContent(this._message, `Списано ${totalPrice} синапсов`)
  }
}