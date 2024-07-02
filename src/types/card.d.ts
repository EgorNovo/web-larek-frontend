//
export type uniqueId = string;

export interface ICard {
  //Отдельный тип uniqueId для более читаемого кода 
  id: uniqueId;
  title: string;
  price: number | null;
  image: string;
  category: string;
  description: string;
}

