import { ICard, uniqueId } from "../../types";
import { IApp } from "../../types/model/App";
import { IOrder } from "../../types/model/order";
import { IEvents } from "../base/events";
import { Model } from "../base/model";

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

  setCatalog( items: ICard[] ) {
    this.catalog = items;
    this.emitChanges('items:chenges', { catalog: this.catalog});
  }

  getPrice():number {
    return this._basket.reduce( (acc, item) => {
      return acc += Number(item.price);
    },0)
  }

  initOrder( order:IOrder ):IOrder {
    this._order = order;
    this._order.clearOrder();
    return this.order;
  }

  clearBasket() {
    this.basket = []
  }

  addInBasket( cardId:uniqueId ) {
    const card = this.catalog.find( card => card.id === cardId )
    this._basket.push(card);
  }

  removeFromBasket( cardId:uniqueId ) {
     this._basket = this.basket.filter( card => card.id !== cardId )
  }

  getItemsIdFromBasket():string[] {
    return this.basket.map( item => item.id);
  }

  createOrderPostData():object {
    return {
      payment:  this._order.paymentMethod,
      address:  this._order.address,
      email:    this._order.email,
      phone:    this._order.phone,
      total:    this.getPrice(),
      items:    this.getItemsIdFromBasket()
    }
  }
} 