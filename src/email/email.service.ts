import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateEmailDto,
  UpdateEmailDto,
  UserIdDto,
  UuidDto,
} from '../global/dto';
import { NotFoundUUID } from '../global/error';
import { Repository } from 'typeorm';
import { Email } from './email.entity';
import * as _ from 'lodash';

@Injectable()
export class EmailService {
  private entity: any = Email;
  private relations: string[] = ['User'];

  constructor(@InjectRepository(Email) private emailRepo: Repository<Email>) {}

  async getEmails() {
    return await this.emailRepo.find({ relations: this.relations });
  }

  async showEmail(uuidDto: UuidDto) {
    const { UUID } = uuidDto;
    const found = await this.emailRepo.findOne({
      where: { UUID },
      relations: this.relations,
    });
    if (!found) throw NotFoundUUID(this.entity, UUID);
    return found;
  }

  async createEmail(createDto: CreateEmailDto) {
    const email = new Email();
    _.merge(email, createDto);
    await this.emailRepo.save(email);
    return email;
  }

  async updateEmail(updateDto: UpdateEmailDto) {
    const { UUID, ...updates } = updateDto;
    const email = await this.showEmail({ UUID });
    if (!_.isEmpty(updates)) _.merge(email, updates);
    await this.emailRepo.save(email);
    return email;
  }

  async deleteEmail(uuidDto: UuidDto) {
    const email = await this.showEmail(uuidDto);
    await this.emailRepo.remove(email);
    return email.Id == null;
  }

  async deleteByUserId(userDto: UserIdDto) {
    await this.emailRepo.delete(userDto);
  }
}
