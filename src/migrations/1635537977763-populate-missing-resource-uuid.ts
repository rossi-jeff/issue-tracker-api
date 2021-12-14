import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 } from 'uuid';

export class populateMissingResourceUuid1635537977763
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const resourceRepo = await manager.getRepository('resource');
    const resources: any[] = await resourceRepo.find({
      where: { UUID: null },
    });
    for (let data of resources) {
      data.UUID = v4();
      await resourceRepo.save(data);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
