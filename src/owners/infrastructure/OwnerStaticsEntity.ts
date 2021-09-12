import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IOwnerStatics } from "../domain/IOwnerStatics";

@Entity("OWNER_STATICS")
export class OwnerStaticsEntity implements IOwnerStatics {
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
