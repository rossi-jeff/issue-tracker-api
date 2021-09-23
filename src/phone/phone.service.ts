import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Phone } from './phone.entity';
import * as _ from 'lodash';
import {
  CreatePhoneDto,
  UpdatePhoneDto,
  UserIdDto,
  UuidDto,
} from '../global/dto';
import { NotFoundUUID } from '../global/error';

@Injectable()
export class PhoneService {
  private entity: any = Phone;
  private relations: string[] = ['User'];

  constructor(@InjectRepository(Phone) private phoneRepo: Repository<Phone>) {}

  async getPhones() {
    return await this.phoneRepo.find({ relations: this.relations });
  }

  async showPhone(uuidDto: UuidDto) {
    const { UUID } = uuidDto;
    const found = await this.phoneRepo.findOne({
      where: { UUID },
      relations: this.relations,
    });
    if (!found) throw NotFoundUUID(this.entity, UUID);
    return found;
  }

  async createPhone(createDto: CreatePhoneDto) {
    const phone = new Phone();
    _.merge(phone, createDto);
    await this.phoneRepo.save(phone);
    return phone;
  }

  async updatePhone(updateDto: UpdatePhoneDto) {
    const { UUID, ...updates } = updateDto;
    const phone = await this.showPhone({ UUID });
    if (!_.isEmpty(updates)) _.merge(phone, updates);
    await this.phoneRepo.save(phone);
    return phone;
  }

  async deletePhone(uuidDto: UuidDto) {
    const phone = await this.showPhone(uuidDto);
    await this.phoneRepo.remove(phone);
    return phone.Id == null;
  }

  async deleteByUserId(userDto: UserIdDto) {
    await this.phoneRepo.delete(userDto);
  }
}
