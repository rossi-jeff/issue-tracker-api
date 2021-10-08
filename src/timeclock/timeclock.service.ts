import { Injectable } from '@nestjs/common';
import { Timeclock } from './timeclock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateTimeclockDto,
  FilterTimeclockDto,
  UpdateTimeclockDto,
  UuidDto,
} from '../global/dto';
import { NotFoundUUID } from '../global/error';
import * as _ from 'lodash';

@Injectable()
export class TimeclockService {
  private entity: any = Timeclock;
  private relations: string[] = ['User', 'Issue', 'Project'];

  constructor(
    @InjectRepository(Timeclock) private timeclockRepo: Repository<Timeclock>,
  ) {}

  async getTimeclocks(filter?: FilterTimeclockDto) {
    const { UserId, ProjectId, IssueId, StartDate, EndDate } = filter;
    let builder = this.timeclockRepo.createQueryBuilder('timeclock');
    builder.leftJoinAndSelect('timeclock.User', 'user');
    builder.leftJoinAndSelect('timeclock.Issue', 'issue');
    builder.leftJoinAndSelect('timeclock.Project', 'project');
    if (StartDate && EndDate) {
      builder.where(
        '((timeclock.Start.Date BETWEEN :StartDate AND :EndDate) OR (timeclock.End.Date BETWEEN :StartDate AND :EndDate))',
        { StartDate, EndDate },
      );
    }
    if (UserId) {
      builder.andWhere('timeclock.UserId = :UserId', { UserId });
    }
    if (ProjectId) {
      builder.andWhere('timeclock.ProjectId = :ProjectId', { ProjectId });
    }
    if (IssueId) {
      builder.andWhere('timeclock.IssueId = :IssueId', { IssueId });
    }
    builder.orderBy('timeclock.Start.Date', 'DESC');
    builder.addOrderBy('timeclock.Start.Time', 'DESC');
    return await builder.getMany();
  }

  async getTimeclocksSorted(UserId: number) {
    return await this.timeclockRepo
      .createQueryBuilder('timeclock')
      .leftJoinAndSelect('timeclock.User', 'user')
      .leftJoinAndSelect('timeclock.Issue', 'issue')
      .leftJoinAndSelect('timeclock.Project', 'project')
      .where('timeclock.UserId = :UserId', { UserId })
      .orderBy('timeclock.Start.Date', 'DESC')
      .addOrderBy('timeclock.Start.Time', 'DESC')
      .getMany();
  }

  async showTimeclock(uuidDto: UuidDto) {
    const { UUID } = uuidDto;
    const found = await this.timeclockRepo.findOne({
      where: { UUID },
      relations: this.relations,
    });
    if (!found) throw NotFoundUUID(this.entity, UUID);
    return found;
  }

  async createTimeclock(createDto: CreateTimeclockDto) {
    const clock = new Timeclock();
    _.merge(clock, createDto);
    await this.timeclockRepo.save(clock);
    return clock;
  }

  async updateTimeclock(updateDto: UpdateTimeclockDto) {
    const { UUID, ...updates } = updateDto;
    const clock = await this.showTimeclock({ UUID });
    _.merge(clock, updates);
    await this.timeclockRepo.save(clock);
    return clock;
  }

  async deleteTimeclock(uuidDto: UuidDto) {
    const clock = await this.showTimeclock(uuidDto);
    await this.timeclockRepo.remove(clock);
    return clock.Id == null;
  }
}
