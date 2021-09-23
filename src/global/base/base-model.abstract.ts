import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  VersionColumn,
  UpdateDateColumn,
  Column,
  BeforeInsert,
} from 'typeorm';
import { v4 } from 'uuid';

export abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  Id: number;

  @Column({ nullable: true, length: 40 })
  UUID: string;

  @BeforeInsert()
  setUUID() {
    this.UUID = v4();
  }

  @CreateDateColumn()
  Created: string;

  @UpdateDateColumn()
  Updated: string;

  @VersionColumn({ type: 'int', default: 1 })
  Version: number;

  @Column({ default: false })
  IsDeleted: boolean;
}
