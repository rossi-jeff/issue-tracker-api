import { MigrationInterface, QueryRunner } from 'typeorm';
import * as faker from 'faker';
import { v4 } from 'uuid';
import { sample } from '../global/util';
let comment: any, issues: any[], users: any[], userIds: number[], rand: number;
const maxPerIssue = 5;

export class seedComments1652817828918 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const issueRepo = await manager.getRepository('issue');
    const userRepo = await manager.getRepository('user');
    const commentRepo = await manager.getRepository('comment');
    users = await userRepo.find();
    userIds = users.map((u) => u.Id);
    issues = await issueRepo.find();
    for (const issue of issues) {
      rand = Math.ceil(Math.random() * maxPerIssue);
      for (let i = 0; i < rand; i++) {
        comment = {
          Title: faker.lorem.sentence(),
          Details: faker.lorem.paragraph(),
          IssueId: issue.Id,
          UUID: v4(),
          AuthorId: sample(userIds),
        };
        await commentRepo.save(comment);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
