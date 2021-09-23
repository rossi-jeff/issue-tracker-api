import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../global/base';
import { Issue } from '../issue/issue.entity';
import { User } from '../user/user.entity';

@Entity()
export class Comment extends BaseModel {
  @Column()
  Title: string;

  @Column()
  Details: string;

  @Column({ type: 'bigint', nullable: true })
  AuthorId: number;

  @Column({ type: 'bigint', nullable: true })
  IssueId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'AuthorId' })
  Author: User;

  @ManyToOne((type) => Issue)
  @JoinColumn({ name: 'IssueId' })
  Issue: Issue;
}
