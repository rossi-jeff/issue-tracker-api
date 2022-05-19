import { MigrationInterface, QueryRunner } from 'typeorm';
import { Project } from '../project/project.entity';
import * as faker from 'faker';
const projectCount = 30;
let project: any;

export class seedProjects1652807644771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const projectRepo = await manager.getRepository('project');

    for (let i = 0; i < projectCount; i++) {
      project = new Project();
      project.Name = faker.company.bs();
      project.Details = faker.lorem.paragraph();
      await projectRepo.save(project);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
