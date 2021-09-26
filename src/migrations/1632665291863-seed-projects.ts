import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 } from 'uuid';
import * as faker from 'faker';

const projectCount = 10;
let projectOps: any,
  temp: any,
  rand: number,
  perProject: number,
  project: any,
  ProjectId: number,
  issueCount: number,
  issueId: any,
  issueIds: number[],
  issue: any;

export class seedProjects1632665291863 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const issueRepo = await manager.getRepository('issue');
    const projectRepo = await manager.getRepository('project');

    const results: any = await issueRepo.find({ select: ['Id'] });
    issueIds = results.map((issue) => issue.Id);
    perProject = Math.floor(issueIds.length / projectCount);

    // shuffle issue ids
    for (let i = issueIds.length - 1; i > 0; i--) {
      temp = issueIds[i];
      rand = Math.floor(Math.random() * i);
      issueIds[i] = issueIds[rand];
      issueIds[rand] = temp;
    }

    for (let i = 0; i < projectCount; i++) {
      projectOps = {
        Name: faker.company.bs(),
        Details: faker.lorem.paragraph(),
        UUID: v4(),
      };
      project = await projectRepo.save(projectOps);
      ProjectId = project.Id;
      issueCount = Math.min(issueIds.length, perProject);

      for (let j = 0; j < issueCount; j++) {
        issueId = issueIds.pop();
        if (issueId) {
          issue = await issueRepo.findOne({ where: { Id: issueId } });
          if (issue) {
            issue.ProjectId = ProjectId;
            await issueRepo.save(issue);
          }
        }
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
