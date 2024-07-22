import { ICard, paymentMethod } from "..";

export interface IOrder {
  items: ICard[],
  address:string,
  paymentMethod:paymentMethod,
  email:string,
  phone:string,
  applyOrder():void,
  clearOrder():void
}