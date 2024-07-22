import { ICard, paymentMethod } from "..";

export interface IOrder {
  items: ICard[],
  address:string,
  paymentMethod:paymentMethod,
  email:string,
  phone:string,
  validatePaymentMethod():void,
  validateAddress():void,
  validateMail():void,
  validatePhone():void,
  applyOrder():void,
  clearOrder():void
}