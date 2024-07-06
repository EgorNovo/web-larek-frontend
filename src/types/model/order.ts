import { ICard } from '../index'

export interface IOrder {
  items: ICard[],
  applyOrder():Promise<object>
  /* ... */
}