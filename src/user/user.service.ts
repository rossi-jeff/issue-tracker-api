import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateEmailDto,
  CreatePhoneDto,
  CreateUserDto,
  CreateRoleDto,
  IdDto,
  UpdateUserDto,
  UuidDto,
  ChangePasswordDto,
} from '../global/dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NotFound, NotFoundUUID } from '../global/error';
import * as _ from 'lodash';
import { EmailService } from '../email/email.service';
import { PhoneService } from '../phone/phone.service';
import { RoleService } from '../role/role.service';
import { TimeclockService } from '../timeclock/timeclock.service';

@Injectable()
export class UserService {
  private entity: any = User;
  private relations: string[] = ['Phones', 'Emails', 'Roles'];

  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private emailService: EmailService,
    private phoneService: PhoneService,
    private roleService: RoleService,
    private timeclockService: TimeclockService,
  ) {}

  async getUsers() {
    return await this.userRepo.find({ relations: this.relations });
  }

  async showUser(idDTO: IdDto) {
    const { Id } = idDTO;
    const found = await this.userRepo.findOne({
      where: { Id },
      relations: this.relations,
    });
    if (!found) throw NotFound(this.entity, Id);
    return found;
  }

  async showUserUuid(uuidDto: UuidDto) {
    const { UUID } = uuidDto;
    const found = await this.userRepo.findOne({
      where: { UUID },
      relations: this.relations,
    });
    if (!found) throw NotFoundUUID(this.entity, UUID);
    return found;
  }

  async checkUsername(Username: string) {
    const user = await this.userRepo.findOne({
      where: {
        Credentials: {
          Username,
        },
      },
      select: ['Id'],
    });
    return user == null;
  }

  async createUser(createDto: CreateUserDto) {
    const user = new User();
    _.merge(user, createDto);
    await this.userRepo.save(user);
    return user;
  }

  async updateUser(updateDto: UpdateUserDto) {
    const { UUID, ...updates } = updateDto;
    const user = await this.showUserUuid({ UUID });
    if (!_.isEmpty(updates)) _.merge(user, updates);
    await this.userRepo.save(user);
    return user;
  }

  async deleteUser(uuidDto: UuidDto) {
    const user = await this.showUserUuid(uuidDto);
    await this.emailService.deleteByUserId({ UserId: user.Id });
    await this.phoneService.deleteByUserId({ UserId: user.Id });
    await this.roleService.deleteByUserId({ UserId: user.Id });
    await this.userRepo.remove(user);
    return user.Id == null;
  }

  async addEmail(UUID: string, createDto: CreateEmailDto) {
    const user = await this.showUserUuid({ UUID });
    createDto.UserId = user.Id;
    return await this.emailService.createEmail(createDto);
  }

  async addPhone(UUID: string, createDto: CreatePhoneDto) {
    const user = await this.showUserUuid({ UUID });
    createDto.UserId = user.Id;
    return await this.phoneService.createPhone(createDto);
  }

  async addRole(UUID: string, createDto: CreateRoleDto) {
    const user = await this.showUserUuid({ UUID });
    createDto.UserId = user.Id;
    return await this.roleService.createRole(createDto);
  }

  async getUserByUsername(Username: string) {
    // for login, password not returned unless asked for
    return this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.Roles', 'role')
      .where('user.Credentials.Username = :Username', { Username })
      .addSelect('user.Credentials.Password')
      .getOne();
  }

  async getUserByUUID(UUID: string) {
    // for password change, get missing password
    return this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.Roles', 'role')
      .where('user.UUID = :UUID', { UUID })
      .addSelect('user.Credentials.Password')
      .getOne();
  }

  async changePassword(UUID: string, changeDto: ChangePasswordDto) {
    const user = await this.getUserByUUID(UUID);

    const { OldPassword, Password, Confirm } = changeDto;
    if (Password != Confirm) {
      return false;
    }
    if (user && user.validatePassword(OldPassword)) {
      user.setEncryptedPassword(Password);
      return await this.userRepo.save(user);
    } else {
      return false;
    }
  }

  async getTimeClocks(UUID: string) {
    const user = await this.showUserUuid({ UUID });
    return await this.timeclockService.getTimeclocksSorted(user.Id);
  }
}
