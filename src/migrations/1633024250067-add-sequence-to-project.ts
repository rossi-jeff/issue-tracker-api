import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addSequenceToProject1633024250067 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'project',
      new TableColumn({
        name: 'sequencePrefix',
        type: 'varchar',
        length: '20',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'project',
      new TableColumn({
        name: 'sequenceMax',
        type: 'int',
        default: '0',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('project', 'sequenceMax');
    await queryRunner.dropColumn('project', 'sequencePrefix');
  }
}
