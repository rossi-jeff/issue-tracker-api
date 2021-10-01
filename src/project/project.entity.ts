import { Column, Entity, OneToMany, BeforeInsert } from 'typeorm';
import { BaseModel } from '../global/base';
import { Issue } from '../issue/issue.entity';
import { SequenceEmbed } from '../global/embed/sequence.embed';

@Entity()
export class Project extends BaseModel {
  @Column()
  Name: string;

  @Column()
  Details: string;

  @Column((type) => SequenceEmbed)
  Sequence: SequenceEmbed;

  @OneToMany((type) => Issue, (issue) => issue.Project)
  Issues: Issue[];

  nextSequenceNumber() {
    if (!this.Sequence.Max) this.Sequence.Max = 0;
    this.Sequence.Max = this.Sequence.Max + 1;
    return `${this.Sequence.Prefix}-${this.Sequence.Max}`;
  }

  @BeforeInsert()
  buildSequencePrefix() {
    if (!this.Sequence.Prefix) {
      this.Sequence.Prefix = this.Name.split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase();
    }
  }
}
