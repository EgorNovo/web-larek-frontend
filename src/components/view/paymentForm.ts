import { IPaymentFormUI } from "../../types/view/paymentForm";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "../common/Form";

export class PaymentFormUI extends Form<IPaymentFormUI> {
  protected _div:     HTMLElement;
  protected _buttons: HTMLButtonElement[];  

  constructor(container:HTMLFormElement, protected events: IEvents) {
    super(container, events)

    this._div = ensureElement<HTMLElement>('.order__buttons', container);
    this._buttons = ensureAllElements<HTMLButtonElement>('.button_alt', container);

    this._div.addEventListener('click', (evt) => {
      const target = evt.target as HTMLButtonElement;

      this.setClassMethodSelected(target.name)
      events.emit('paymentMethod:change', { target:target.name })
    })
  }

  setClassMethodSelected( name:string ):void {
    this._buttons.forEach( button => {
      if (button.name === name) {
        this.toggleClass(button, 'button_alt-active', true);
      } else {
        this.toggleClass(button, 'button_alt-active', false);
      }
    })
  }

  set paymentMethod( method:string ) {
    this.setClassMethodSelected(method);
  }

  set address(address:string) {
    (this.container.elements.namedItem('address') as HTMLInputElement).value = address;
  }

}