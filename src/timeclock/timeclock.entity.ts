import { BaseModel } from '../global/base';
import { ClockEmbed } from '../global/embed';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Project } from '../project/project.entity';
import { Issue } from '../issue/issue.entity';

@Entity()
export class Timeclock extends BaseModel {
  @Column((type) => ClockEmbed)
  Start: ClockEmbed;

  @Column((type) => ClockEmbed)
  End: ClockEmbed;

  @Column({ type: 'bigint', nullable: true })
  UserId: number;

  @Column({ type: 'bigint', nullable: true })
  ProjectId: number;

  @Column({ type: 'bigint', nullable: true })
  IssueId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'UserId' })
  User: User;

  @ManyToOne((type) => Project)
  @JoinColumn({ name: 'ProjectId' })
  Project: Project;

  @ManyToOne((type) => Issue)
  @JoinColumn({ name: 'IssueId' })
  Issue: Issue;
}
