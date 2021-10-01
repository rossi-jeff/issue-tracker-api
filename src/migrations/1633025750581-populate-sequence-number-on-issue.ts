import { MigrationInterface, QueryRunner } from 'typeorm';

export class populateSequenceNumberOnIssue1633025750581
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const issueRepo = await manager.getRepository('issue');
    const projectRepo = await manager.getRepository('project');

    const results: any[] = await projectRepo.find({
      relations: ['Issues'],
    });
    for (let project of results) {
      project.buildSequencePrefix();
      for (let issue of project.Issues) {
        issue.SequenceNumber = project.nextSequenceNumber();
        await issueRepo.save(issue);
      }
      await projectRepo.save(project);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
