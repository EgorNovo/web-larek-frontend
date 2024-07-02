import { ICard } from "./card";
import { orderStatus } from "./form";

export interface IBasket {
  //Уникальные товары в корзине 
  items: Map<ICard, number>;
  totalPrice: number;

  //Методы работы с товарами в корзине 
  addCard:    (card:  ICard) => void;
  removeCard: (card:  ICard) => void;
  getResult:  (order: Map<ICard, number>) => number;
  applyOrder: (cards: ICard[]) => orderStatus;
  clearBasket: () => void;
}