import { IProduct } from "./product";

export interface IBasket {
  //Уникальные товары в корзине 
  items: Map<IProduct, number>;
  totalPrice: number;
}