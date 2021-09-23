import { User } from '../user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base';
import { PhoneTypeEnum, UsageEnum } from '../global/enum';

@Entity()
export class Phone extends BaseModel {
  @Column()
  Number: string;

  @Column({
    type: 'enum',
    enum: UsageEnum,
  })
  Usage: string;

  @Column({
    type: 'enum',
    enum: PhoneTypeEnum,
  })
  Type: string;

  @Column({ default: false })
  Public: boolean;

  @Column({ type: 'bigint', nullable: true })
  UserId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'UserId' })
  User: User;
}
