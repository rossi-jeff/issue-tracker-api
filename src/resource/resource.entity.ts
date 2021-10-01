import { BaseModel } from '../global/base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Resource extends BaseModel {
  @Column()
  Name: string;

  @Column()
  Details: string;

  @Column()
  Url: string;
}
