import { IPage, uniqueId } from "../types";
import { IBasket } from "../types/model/basket";
import { IProduct } from "../types/model/product";

class Page implements IPage {
  basket: IBasket;
  gallery: IProduct[] = [];

  constructor(items: IProduct[] = []) {
    this.renderGallery(items)
  }

  renderGallery(items: IProduct[] = []):void {
    /* Добавляем карточки товаров на страницу */
  }

  setCounterBasket(basket: IBasket):void {
    /* Устанавливаем счетчик товаров в корзине в верстке  */
  };

  removeActiveCard(id:uniqueId):void {
    /* Удаляем карточку из коллекции, которую добавили в корзину */
  }

  checkDuplicate(id:uniqueId):void {
    /* Проверяем наличик дубликата карточки в корзине */
  }
}
