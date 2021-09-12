import { Column, Entity, PrimaryColumn } from "typeorm";
import { IUserStatics } from "../domain/IUserStatics";

@Entity("USER_STATICS")
export class UserStaticsEntity implements IUserStatics {
  @PrimaryColumn()
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
}
