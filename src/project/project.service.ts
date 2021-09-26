import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '../global/dto/create-project.dto';
import { UpdateProjectDto } from '../global/dto/update-project.dto';
import { NotFoundUUID } from '../global/error';
import { Project } from './project.entity';
import * as _ from 'lodash';

@Injectable()
export class ProjectService {
  private entity: any = Project;
  private relations: string[] = [
    'Issues',
    'Issues.Author',
    'Issues.AssignedTo',
  ];

  constructor(
    @InjectRepository(Project) private projectRepo: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = new Project();
    _.merge(project, createProjectDto);
    await this.projectRepo.save(project);
    return project;
  }

  async findAll() {
    return await this.projectRepo.find({ relations: this.relations });
  }

  async findOne(UUID: string) {
    const found = await this.projectRepo.findOne({
      where: { UUID },
      relations: this.relations,
    });
    if (!found) throw NotFoundUUID(this.entity, UUID);
    return found;
  }

  async update(UUID: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(UUID);
    _.merge(project, updateProjectDto);
    await this.projectRepo.save(project);
    return project;
  }

  async remove(UUID: string) {
    const project = await this.findOne(UUID);
    await this.projectRepo.remove(project);
    return project.Id == null;
  }
}
