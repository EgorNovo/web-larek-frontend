import { ICard, uniqueId } from "..";
import { IOrder } from "./order";

export interface IApp {
  order: IOrder,
  catalog: ICard[],
  basket: ICard[],
  setCatalog(items: ICard[]):void,
  setPrice():number,
  initOrder():IOrder,
  clearBasket():void,
  addInBasket( cardId:uniqueId):void,
  removeFromBasket( cardId:uniqueId ):void,
  getItemsIdFromBasket():string[],
  createOrderPostData():object
}