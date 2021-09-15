import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ICard } from '../../../Domain/ICard';

@Entity('SL_CARD')
export class CardEntity implements ICard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  rarity: string;

  @Column()
  ownerId: number;

  @Column()
  published: boolean;

  @Column()
  type: string;
}
