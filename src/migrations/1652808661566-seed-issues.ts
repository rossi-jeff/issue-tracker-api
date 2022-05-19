import { MigrationInterface, QueryRunner } from 'typeorm';
import { Issue } from '../issue/issue.entity';
import * as faker from 'faker';
import {
  ComplexityArray,
  IssueTypeArray,
  PriorityArray,
  StatusArray,
} from '../global/array';
import { sample } from '../global/util';
const maxPerProject = 20;
let issue: any,
  issueCount: number,
  rand: number,
  projects: any[],
  users: any[],
  userIds: number[];

export class seedIssues1652808661566 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const projectRepo = await manager.getRepository('project');
    const issueRepo = await manager.getRepository('issue');
    const userRepo = await manager.getRepository('user');
    projects = await projectRepo.find();
    users = await userRepo.find();
    userIds = users.map((u) => u.Id);
    for (const project of projects) {
      issueCount = Math.ceil(Math.random() * maxPerProject);
      for (let i = 0; i < issueCount; i++) {
        issue = new Issue();
        issue.ProjectId = project.Id;
        issue.SequenceNumber = project.nextSequenceNumber();
        issue.Title = faker.lorem.sentence();
        issue.Details = faker.lorem.paragraph();
        issue.Type = sample(IssueTypeArray);
        issue.Status = sample(StatusArray);
        issue.Priority = sample(PriorityArray);
        issue.Complexity = sample(ComplexityArray);
        issue.AuthorId = sample(userIds);
        rand = Math.floor(Math.random() * 2);
        if (rand > 0) issue.AssignedToId = sample(userIds);
        await issueRepo.save(issue);
      }
      await projectRepo.save(project); /// sequence updates
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
