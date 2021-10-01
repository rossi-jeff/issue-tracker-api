import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addSequenceNumberToIssue1633025085004
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'issue',
      new TableColumn({
        name: 'SequenceNumber',
        type: 'varchar',
        length: '30',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('issue', 'SequenceNumber');
  }
}
