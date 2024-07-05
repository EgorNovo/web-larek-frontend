import { EventEmitter } from "./events";

export abstract class Model<T> {
  data:T;

  constructor(data:T, events:EventEmitter) {
    this.data = data;
  }
  /*

  */
}