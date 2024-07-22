import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { UIComponent } from "../base/view";

export interface IModal {
  content: HTMLElement
}

export class Modal extends UIComponent<IModal> {
  protected _closeButton: HTMLButtonElement;
  protected _content: HTMLElement;

  constructor( container: HTMLElement,protected events: IEvents) {
    super(container);

    this._closeButton   = ensureElement<HTMLButtonElement>('.modal__close', container);
    this._content       = ensureElement<HTMLElement>('.modal__content', container);

    this._closeButton.addEventListener('click', this.close.bind(this));
    this.container.addEventListener('click', evt => {
      if(evt.target === evt.currentTarget) {
        this.close();
      }
    })
    this.handleEscUp = this.handleEscUp.bind(this)
  }

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  open() {
    this.container.classList.add('modal_active');
    this.events.emit('modal:open');
  }

  close() {
    this.container.classList.remove('modal_active');
    this.events.emit('modal:close');
  }

  handleEscUp(evt: KeyboardEvent) {
    if( evt.key === "Escape") {
      this.close()
    }
  }
}