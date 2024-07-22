import { IBasketUI } from "../../types/view/basket";
import { createElement, ensureElement, ensureAllElements } from "../../utils/utils";
import { IEvents } from "../base/events";
import { UIComponent } from "../base/view";

export class BasketUI extends UIComponent<IBasketUI> {
  protected _list:    HTMLUListElement;
  protected _price:   HTMLSpanElement;
  protected _button:  HTMLButtonElement;
  protected _index:   HTMLSpanElement[];

  constructor(container:HTMLElement, events: IEvents) {
    super(container)

    this._list    = ensureElement<HTMLUListElement>('.basket__list', container);
    this._price   = ensureElement<HTMLSpanElement>('.basket__price', container);
    this._button  = ensureElement<HTMLButtonElement>('.basket__button', container);

    if (this._button) {
      this._button.addEventListener('click', () => {
        events.emit("payment:open")
      })
    }
  }

  set price(price:number) {
    this.setTextContent(this._price, `${price} синапсов`)
  }

  set valid( value:boolean ) {
    this.setDisabled(this._button, !value)
  }

  set list(li:HTMLElement[]) {
    if(li.length) {
      this._list.replaceChildren(...li)
    } else {
      this._list.replaceChildren(createElement<HTMLParagraphElement>('p', {
        textContent: 'Корзина пуста'
      }))
    }
  }

  renderWithIndex(data?: Partial<IBasketUI>): HTMLElement {
    this._index   = ensureAllElements<HTMLSpanElement>('.basket__item-index', this.container);

    this._index.forEach( (item, index) => {
      this.setTextContent(item, String(index+1))
    })

    return super.render(data);
  }
}