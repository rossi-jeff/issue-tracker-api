import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '../global/base';
import { Issue } from '../issue/issue.entity';

@Entity()
export class Project extends BaseModel {
  @Column()
  Name: string;

  @Column()
  Details: string;

  @OneToMany((type) => Issue, (issue) => issue.Project)
  Issues: Issue[];
}
