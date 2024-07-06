import { IOrder } from "./order";

export interface IApp {
  order: IOrder,

  getCollections(): void,
  checkValidInpit(): void,
  clearBasket(): void,
  setBasketCounter(): void,

  /* ... */

}