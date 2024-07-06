import { IApp } from "../../types/model/App";
import { IEvents } from "../base/events";
import { Model } from "../base/model";

export class Order extends Model<IApp> {
    constructor(data:IApp, event: IEvents) {
      super(data, event)
    }

    /*  */
}