import { uniqueId } from "../../types";
import { ICardUI } from "../../types/view/card";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { UIComponent } from "../base/view";

export class CardUI extends UIComponent<ICardUI> {
  protected _category:     HTMLElement;
  protected _title:        HTMLElement;
  protected _image?:       HTMLImageElement;
  protected _price:        HTMLElement;
  protected _button?:      HTMLButtonElement;
  protected _buttonDelete?:HTMLButtonElement;
  protected _description?: HTMLElement;
  protected _id:           uniqueId;
  protected _inBasket?:    boolean;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container);

    this._title           = ensureElement<HTMLElement>(`.card__title`, container)
    this._price           = ensureElement<HTMLElement>(`.card__price`, container)
    this._button          = container.querySelector('.button');
    this._description     = container.querySelector('.card__text');
    this._category        = container.querySelector(`.card__category`);
    this._image           = container.querySelector(`.card__image`);
    this._buttonDelete    = container.querySelector('.basket__item-delete');

    if(this._button) {
      this._button.addEventListener('click', () => {
          events.emit('basket:onChange', {cardId: this._id, flag:'add'})
        })
    } else if(!this._buttonDelete) {
      this.container.addEventListener('click', () => {
        events.emit('card:selected', {cardId: this._id})
      })
    }

    if(this._buttonDelete) {
      this._buttonDelete.addEventListener('click', () => {
        events.emit('basket:onChange', {cardId: this._id, flag: 'remove'})
      })
    }
  }

  set description(description:string) {
   this.setTextContent(this._description, description);
  }

  set category(category:string) {
    this.setTextContent(this._category, category);
    
    switch(category) {
      case 'софт-скил':  
        this.toggleClass(this._category, 'card__category_soft', true)
        break;
    
      case 'другое': 
        this.toggleClass(this._category, 'card__category_other', true)
        break;
    
      case 'дополнительное': 
        this.toggleClass(this._category, 'card__category_additional', true)
        break;

      case 'кнопка':
        this.toggleClass(this._category, 'card__category_button', true)
        break;  

      case 'хард-скил':
        this.toggleClass(this._category, 'card__category_hard', true)
        break;  
    }
  }

  set title(title:string) {
    this.setTextContent(this._title, title);
  }

  set image(src:string) {
    this._image.src = src;
  }

  set price(price:number | null) {
    if(!price) {
      this.setTextContent(this._price, 'Бесцено');
    } else {
      this.setTextContent(this._price, `${String(price)} синапсов`); 
    }
  }

  set inBasket( value:boolean ) {
    this.setDisabled(this._button, value)
  }

  set id(id:uniqueId) {
    this._id = id;
  }
}