export interface ICard {
  id: number;
  name: string;
  image: string;
  rarity: string;
  ownerId: number;
  published: boolean;
  type: string;
  userId?: string;
}
