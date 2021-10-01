import { Column } from 'typeorm';

export class SequenceEmbed {
  @Column({ nullable: true, length: 20 })
  Prefix: string;

  @Column({ type: 'int', default: 0 })
  Max: number;
}
