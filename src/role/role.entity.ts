import { User } from '../user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base';
import { RoleEnum } from '../global/enum';

@Entity()
export class Role extends BaseModel {
  @Column({
    type: 'enum',
    enum: RoleEnum,
  })
  Name: string;

  @Column({ type: 'bigint', nullable: true })
  UserId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'UserId' })
  User: User;
}
