import { Column } from 'typeorm';

export class ClockEmbed {
  @Column({ nullable: true, length: 10 })
  Date: string;

  @Column({ nullable: true, length: 10 })
  Time: string;
}
