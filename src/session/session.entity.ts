import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base';
import { User } from '../user/user.entity';

@Entity()
export class Session extends BaseModel {
  @Column()
  Name: string;

  @Column()
  UserName: string;

  @Column({ default: true })
  Active: boolean;

  @Column({ type: 'bigint', nullable: true })
  UserId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'UserId' })
  User: User;
}
