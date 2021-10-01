import { Injectable } from '@nestjs/common';
import { Resource } from './resource.entity';
import { UuidDto, CreateResourceDto, UpdateResourceDto } from '../global/dto';
import { NotFoundUUID } from '../global/error';
import * as _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ResourceService {
  private entity: any = Resource;

  constructor(
    @InjectRepository(Resource) private resourceRepo: Repository<Resource>,
  ) {}

  async getResources() {
    return await this.resourceRepo.find();
  }

  async showResource(uuidDto: UuidDto) {
    const { UUID } = uuidDto;
    const found = await this.resourceRepo.findOne({
      where: { UUID },
    });
    if (!found) throw NotFoundUUID(this.entity, UUID);
    return found;
  }

  async createResource(createDto: CreateResourceDto) {
    const resource = new Resource();
    _.merge(resource, createDto);
    await this.resourceRepo.save(resource);
    return resource;
  }

  async updateResource(updateDto: UpdateResourceDto) {
    const { UUID, ...updates } = updateDto;
    const resource = await this.showResource({ UUID });
    _.merge(resource, updates);
    await this.resourceRepo.save(resource);
    return resource;
  }

  async deleteResource(uuidDto: UuidDto) {
    const resource = await this.showResource(uuidDto);
    await this.resourceRepo.remove(resource);
    return resource.Id == null;
  }
}
