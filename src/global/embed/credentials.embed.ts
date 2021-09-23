import { Column, Index } from 'typeorm';

export class CredentialsEmbed {
  @Index('IDX-credentialsUsername', { unique: true })
  @Column({ nullable: true, length: 50 })
  Username: string;

  @Column({ select: false })
  Password: string;
}
