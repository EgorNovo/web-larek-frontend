export type uniqueId = string;
export type paymentMethod = "online"|"cash";

export interface ICard {
  id: uniqueId,
  category: string,
  titile: string,
  description: string,
  price: number | null,
  image: string
}