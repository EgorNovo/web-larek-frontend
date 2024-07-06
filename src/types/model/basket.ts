import { ICard } from "..";

export interface IBasket {
  items: ICard[],

  add(): void,
  remove(): void
}