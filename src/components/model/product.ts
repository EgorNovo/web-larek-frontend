import { uniqueId } from "../../types";
import { IProduct } from "../../types/model/product";

export class Product implements IProduct {
  id: uniqueId;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;

  /*Все данные приходят с API, добавляем их через constructor */
  constructor(id: uniqueId,
      description: string,
      image: string,
      title: string,
      category: string,
      price: number | null) 
    {
      this.id = id;
      this.category = category;
      this.description = description;
      this.image = image;
      this.price = price;
      this.title = title;
    }

    addinBasket(id:uniqueId):void {
      /* Функционал добавление карточки в корзину */
    }
}

