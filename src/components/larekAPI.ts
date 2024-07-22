import { ICard } from "../types";
import { Api, ApiListResponse } from "./base/api";

export interface ILarekAPI {
  /*.....*/
}

export class LarekAPI extends Api implements ILarekAPI {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getCardItem(id:string): Promise<ICard> {
    return this.get(`/product/${id}`).then(
      (item: ICard) => ({
        ...item,
        image: this.cdn + item.image
      })
    )
  }

  getCardList(): Promise<ICard[]> {
    return this.get(`/product`).then((data: ApiListResponse<ICard>) => 
    data.items.map( (item) => ({
      ...item,
      image: this.cdn + item.image
    })))
  }
}