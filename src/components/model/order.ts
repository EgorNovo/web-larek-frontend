import { IOrder } from "../../types/model/order";
import { IEvents } from "../base/events";
import { Model } from "../base/model";

export class Order extends Model<IOrder> {
    constructor(data:IOrder, event: IEvents) {
      super(data, event)
    }

    /*  */
}