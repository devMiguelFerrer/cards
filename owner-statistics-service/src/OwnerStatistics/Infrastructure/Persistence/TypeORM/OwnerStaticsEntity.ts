import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IOwnerStatistics } from '../../../Domain/IOwnerStatistics';

@Entity('SL_OWNER_STATICS')
export class OwnerStatisticsEntity implements IOwnerStatistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ownerId: number;

  @Column()
  cardId: number;

  @Column()
  cardName: string;

  @Column()
  cardImage: string;

  @Column()
  cardRarity: string;

  @Column()
  cardUses: number;
}
