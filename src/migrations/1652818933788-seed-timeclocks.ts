import { MigrationInterface, QueryRunner } from 'typeorm';
import { sample, formatTime, formatDate } from '../global/util';
import { v4 } from 'uuid';

const minute = 60 * 1000;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;
const workday = hour * 8;

const maxPerUser = 5;
const issues: any = [],
  users: any = [];
let results: any = [],
  rand: number,
  options: any,
  startTime: number,
  endTime: number,
  startDate: Date,
  endDate: Date,
  offset: number;

export class seedTimeclocks1652818933788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const issueRepo = await manager.getRepository('issue');
    const userRepo = await manager.getRepository('user');
    const clockRepo = await manager.getRepository('timeclock');
    results = await issueRepo.find({
      select: ['Id', 'ProjectId'],
    });
    for (const result of results) {
      issues.push({ IssueId: result.Id, ProjectId: result.ProjectId });
    }
    results = await userRepo.find({
      select: ['Id'],
    });
    for (const result of results) {
      users.push({ UserId: result.Id });
    }
    for (const user of users) {
      const { UserId } = user;
      rand = Math.ceil(Math.random() * maxPerUser);
      for (let i = 0; i < rand; i++) {
        const { IssueId, ProjectId } = sample(issues);

        offset = Math.floor(Math.random() * month);
        startTime = new Date().getTime() - offset;
        endTime = startTime + Math.floor(Math.random() * workday);
        startDate = new Date(startTime);
        endDate = new Date(endTime);

        options = {
          UUID: v4(),
          UserId,
          IssueId,
          ProjectId,
          Start: {
            Date: formatDate(startDate),
            Time: formatTime(startDate),
          },
          End: {
            Date: formatDate(endDate),
            Time: formatTime(endDate),
          },
        };
        await clockRepo.save(options);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
