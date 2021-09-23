import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateRoleDto,
  UpdateRoleDto,
  UserIdDto,
  UuidDto,
} from '../global/dto';
import { NotFoundUUID } from '../global/error';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import * as _ from 'lodash';

@Injectable()
export class RoleService {
  private entity: any = Role;
  private relations: string[] = ['User'];

  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {}

  async getRoles() {
    return await this.roleRepo.find({ relations: this.relations });
  }

  async showRole(uuidDto: UuidDto) {
    const { UUID } = uuidDto;
    const found = await this.roleRepo.findOne({
      where: { UUID },
      relations: this.relations,
    });
    if (!found) throw NotFoundUUID(this.entity, UUID);
    return found;
  }

  async createRole(createDto: CreateRoleDto) {
    const role = new Role();
    _.merge(role, createDto);
    await this.roleRepo.save(role);
    return role;
  }

  async updateRole(updateDto: UpdateRoleDto) {
    const { UUID, ...updates } = updateDto;
    const role = await this.showRole({ UUID });
    if (!_.isEmpty(updates)) _.merge(role, updates);
    await this.roleRepo.save(role);
    return role;
  }

  async deleteRole(uuidDto: UuidDto) {
    const role = await this.showRole(uuidDto);
    await this.roleRepo.remove(role);
    return role.Id == null;
  }

  async deleteByUserId(userDto: UserIdDto) {
    await this.roleRepo.delete(userDto);
  }
}
