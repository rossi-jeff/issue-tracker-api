import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base';
import { UsageEnum } from '../global/enum';
import { User } from '../user/user.entity';

@Entity()
export class Email extends BaseModel {
  @Column()
  Address: string;

  @Column({
    type: 'enum',
    enum: UsageEnum,
  })
  Usage: string;

  @Column({ default: false })
  Public: boolean;

  @Column({ type: 'bigint', nullable: true })
  UserId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'UserId' })
  User: User;
}
