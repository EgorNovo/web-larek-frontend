import { ICardUI } from "../../types/view/card";
import { IEvents } from "../base/events";
import { UIComponent } from "../base/view";

export class CardUI extends UIComponent<ICardUI> {
  protected _category:    HTMLElement;
  protected _title:       HTMLElement;
  protected _description: HTMLElement;
  protected _image:       HTMLElement;
  protected _price:       HTMLElement;
  protected _button:      HTMLElement;


  constructor(container:HTMLElement, protected settings:object, events: IEvents) {
    super(container, events)

    this._category = container.querySelector(`${settings.classNameCategoryParagraph}`)
    this._title = container.querySelector(`${settings.classNameTitleParagraph}`)
    this._description = container.querySelector(`${settings.classNameDescriptionParagraph}`)
    this._image = container.querySelector(`${settings.classNameImg}`)
    this._price = container.querySelector(`${settings.classNamePriceParagraph}`)
    this._button = container.querySelector(`${settings.classNameButton}`)
  }

  set category(category:string) {
    super.setTextConten(this._category, category);
  }

  set title(title:string) {
    super.setTextConten(this._title, title);
  }

  set description(description:string) {
    super.setTextConten(this._description, description);
  }

  set image(src:string) {
    super.setImage(this._image, src);
  }

  set alt(alt:string) {
    super.setAlt(this._image, alt);
  }

  set price(price:string) {
    super.setTextConten(this._price, price);
  }

  /* ..... */
}