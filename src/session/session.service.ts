import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginSessionDto, UuidDto } from '../global/dto';
import { Session } from './session.entity';
import * as _ from 'lodash';
import { NotFoundUUID } from '../global/error';

@Injectable()
export class SessionService {
  private entity: any = Session;

  constructor(
    @InjectRepository(Session) private sesionRepo: Repository<Session>,
  ) {}

  async login(loginDto: LoginSessionDto) {
    const session = new Session();
    _.merge(session, loginDto);
    await this.sesionRepo.save(session);
    return session;
  }

  async logout(uuidDto: UuidDto) {
    const { UUID } = uuidDto;
    const session = await this.sesionRepo.findOne({
      where: { UUID },
    });
    if (!session) throw NotFoundUUID(this.entity, UUID);
    session.Active = false;
    await this.sesionRepo.save(session);
    return session;
  }
}
