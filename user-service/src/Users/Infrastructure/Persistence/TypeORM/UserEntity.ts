import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../../../Domain/IUser';

@Entity('SL_USER')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  pass: string;
}
