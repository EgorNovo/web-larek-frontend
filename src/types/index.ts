import { IBasket } from "./basket";
import { ICard } from "./card";

export interface IAppState {
  basket: IBasket;
  gallery: ICard[];
}