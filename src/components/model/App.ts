import { ICard } from "../../types";
import { IApp } from "../../types/model/App";
import { IOrder } from "../../types/model/order";
import { IEvents } from "../base/events";
import { Model } from "../base/model";
import { Order } from "./order";

export type CatalogChangeEvent = {
  catalog: ICard[];
}

export class App extends Model<IApp> {
  protected _order: IOrder;
  protected _catalog: ICard[];
  protected _basket: ICard[];

  constructor(data:Partial<IApp>, protected events:IEvents) {
    super(data, events)
    this.catalog = [];
    this.basket = [];
  }

  set catalog( catalog: ICard[]) {
    this._catalog = catalog;
  }

  get catalog() {
    return this._catalog;
  }

  set basket( basket: ICard[]) {
    this._basket = basket;
  }

  get basket() {
    return this._basket;
  }

  get order() {
    return this._order;
  }

  setCatalog(items: ICard[]) {
    this.catalog = items;
    this.emitChanges('items:chenges', { catalog: this.catalog});
  }

  setPrice():number {
    return this._basket.reduce( (acc, item) => {
      return acc += Number(item.price);
    },0)
  }

  initOrder():IOrder {
    this._order = new Order({}, this.events);
    this._order.clearOrder();
    return this.order;
  }

  clearBasket() {
    this.basket = []
  }
} 