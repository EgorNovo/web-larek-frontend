import { IEvents } from "./events";

export abstract class Model<T> {
  data:T;

  constructor(data:T, protected events:IEvents) {
    this.data = data;
  }
  
  event(event: string, settings:object) {
    /* ... */
  }
}