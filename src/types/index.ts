export type uniqueId = string;
export type paymentMethod = "online"|"cash";

export interface ICard {
  category: string,
  title: string,
  price: number | null,
  image: string,
  id:uniqueId,
  description: string
}