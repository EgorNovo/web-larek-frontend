import { uniqueId } from "../../types";
import { IContant, IOrder, IOrderOptions, orderStatus, paymentMethod } from "../../types/model/order";
import { IProduct } from "../../types/model/product";

export class Order implements IOrder {
  id: uniqueId;
  adress: string;
  mail: string;
  phone: string;
  payment: paymentMethod;
  status: orderStatus;
  items: IProduct[];

  constructor(id:uniqueId) {
    this.id = id;
    this.setStatus('create');
  }
  
  /* Устанавливаем значение для метода оплаты и адреса */
  setOptions( options:IOrderOptions ):void {
    this.adress = options.adress;
    this.payment = options.payment;
  }

  /* Устанавливаем значение для почты и телефона */
  setContact( contact:IContant ):void {
    this.mail = contact.mail;
    this.phone = contact.phone;
  }

  /* Устанавливаем значение для статуса заказа */
  setStatus( status: orderStatus ):void {
    this.status = status;
  }

  /* Устанавливаем список покупок */
  setItems( items:IProduct[] ):void {
    this.items = items;
  }

  changeStatus(id: uniqueId):void {
    /* Проверяем что с заказом */
  }
}
