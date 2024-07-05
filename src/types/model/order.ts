import { uniqueId } from "../index";
import { IProduct } from "./product";

export type paymentMethod = "online" | "receive"; 
export type orderStatus   = "accept" | "decline" | "delivery" | "create";

//Интерфейс для работы с обьектом, в котором находятся только адрес и способ оплаты
export interface IOrderOptions {
  adress: string;
  payment: paymentMethod;
}

//Интерфейс для работы с обьектом, в котором находятся только контактные данные
export interface IContant {
  mail: string;
  phone: string;
}

//Интерфейс для заказа
export interface IOrder extends IContant, IOrderOptions {
  id: uniqueId;
  status: orderStatus;
  items: IProduct[];
}