import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUserStatistics } from '../../../Domain/IUserStatistics';

@Entity('SL_USER_STATICS')
export class UserStatisticsEntity implements IUserStatistics {
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

  @Column()
  cardsObtained: number;

  @Column()
  userId: number;
}
