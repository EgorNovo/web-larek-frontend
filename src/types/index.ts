import { IBasket } from "./model/basket";
import { IProduct } from "./model/product";

export type uniqueId = string;

export interface IPage {
  basket: IBasket;
  gallery: IProduct[] | [];
}