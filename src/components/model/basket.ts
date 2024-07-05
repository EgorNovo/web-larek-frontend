import { IBasket } from "../../types/model/basket";
import { IProduct } from "../../types/model/product";

export class Basket implements IBasket {
  items:Map<IProduct, number>;
  totalPrice = 0

  remove( card: IProduct ):void {
    /* Функционал удаление карточки, по нажатию на кнопку корзины */
  }

  getTotalPrice( items: Map<IProduct, number> ):number {
    /* Расчет суммы товаров в корзине */
    return 1;
  }

  applyOrder( items:Map<IProduct, number> ):Promise<object> {
    /* Запускаем отправку заказа по нажатию на кнопку оформить */
    return Promise.resolve({})
  };

  clearBasket():void {
    /* Очищаем корзину после успешного оформления заказа */
  }
}