import { ICard } from "..";
import { IOrder } from "./order";

export interface IApp {
  order: IOrder,
  catalog: ICard[],
  basket: ICard[],
  setCatalog(items: ICard[]):void,
  setPrice():number,
  initOrder():IOrder,
  clearBasket():void
}