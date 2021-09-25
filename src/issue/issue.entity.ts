import { User } from '../user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../global/base';
import {
  ComplexityArray,
  IssueTypeArray,
  PriorityArray,
  StatusArray,
} from '../global/array';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Issue extends BaseModel {
  @Column()
  Title: string;

  @Column()
  Details: string;

  @Column({
    type: 'enum',
    enum: IssueTypeArray,
  })
  Type: string;

  @Column({
    type: 'enum',
    enum: StatusArray,
  })
  Status: string;

  @Column({
    type: 'enum',
    enum: PriorityArray,
  })
  Priority: string;

  @Column({
    type: 'enum',
    enum: ComplexityArray,
  })
  Complexity: string;

  @Column({ type: 'bigint', nullable: true })
  AuthorId: number;

  @Column({ type: 'bigint', nullable: true })
  AssignedToId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'AuthorId' })
  Author: User;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'AssignedToId' })
  AssignedTo: User;

  @OneToMany((type) => Comment, (comment) => comment.Issue)
  Comments: Comment[];
}
