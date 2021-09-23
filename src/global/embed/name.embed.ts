import { Column } from 'typeorm';

export class NameEmbed {
  @Column({ nullable: true, length: 50 })
  First: string;

  @Column({ nullable: true, length: 50 })
  Middle: string;

  @Column({ nullable: true, length: 50 })
  Last: string;
}
