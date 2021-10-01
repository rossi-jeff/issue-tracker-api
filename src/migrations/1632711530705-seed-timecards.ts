import { MigrationInterface, QueryRunner } from 'typeorm';
import { sample, formatTime, formatDate } from '../global/util';
import { v4 } from 'uuid';

let results: any,
  users: any = [],
  issues: any = [],
  cardOptions: any,
  startTime: number,
  endTime: number,
  startDate: Date,
  endDate: Date,
  offset: number;

const minute = 60 * 1000;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;
const workday = hour * 8;

export class seedTimecards1632711530705 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    // issues contain both Id/IssueId and ProjectId
    const issueRepo = await manager.getRepository('issue');
    const userRepo = await manager.getRepository('user');
    const clockRepo = await manager.getRepository('timeclock');

    results = await issueRepo.find({
      select: ['Id', 'ProjectId'],
    });
    for (let result of results) {
      issues.push({ IssueId: result.Id, ProjectId: result.ProjectId });
    }

    results = await userRepo.find({
      select: ['Id'],
    });
    for (let result of results) {
      users.push({ UserId: result.Id });
    }

    for (let user of users) {
      let UserId = user.UserId;
      for (let i = 0; i < 3; i++) {
        let { IssueId, ProjectId } = sample(issues);

        // timestamps within the last month less than 8 hours apart
        offset = Math.floor(Math.random() * month);
        startTime = new Date().getTime() - offset;
        endTime = startTime + Math.floor(Math.random() * workday);
        startDate = new Date(startTime);
        endDate = new Date(endTime);

        cardOptions = {
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
        await clockRepo.save(cardOptions);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
