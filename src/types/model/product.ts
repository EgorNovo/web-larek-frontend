import { uniqueId } from "../index";

export interface IProduct {
  id: uniqueId;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
