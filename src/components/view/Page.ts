import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { UIComponent } from "../base/view";

export interface IPage {
  counter: number;
  catalog: HTMLElement[];
  scroll: boolean;
}

export class Page extends UIComponent<IPage> {
  protected _counter: HTMLElement;
  protected _catalog: HTMLElement;
  protected _basket: HTMLButtonElement;
  protected _wrapper: HTMLElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);

    this._counter = ensureElement<HTMLElement>('.header__basket-counter');
    this._catalog = ensureElement<HTMLElement>('.gallery');
    this._basket  = ensureElement<HTMLButtonElement>('.header__basket');
    this._wrapper = ensureElement<HTMLElement>('.page__wrapper')

    this._basket.addEventListener('click', () => {
      events.emit('basket:open')
    })
  }

  set catalog(items: HTMLElement[]) {
    this._catalog.replaceChildren(...items)
  }

  set counter(value:number) {
    this.setTextContent(this._counter, String(value))
  }

  set block(value:boolean) {
    this.toggleClass(this._wrapper, 'page__wrapper_locked', value)
  }
}