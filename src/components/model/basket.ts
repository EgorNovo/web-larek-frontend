import { IBasket } from "../../types/model/basket";
import { IEvents } from "../base/events";
import { Model } from "../base/model";

export class Basket extends Model<IBasket> {
    constructor(data:IBasket, event: IEvents) {
      super(data, event)
    }

    /*  */
}