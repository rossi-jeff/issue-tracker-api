import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class addProjectRelationToIssue1632658309426
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'issue',
      new TableColumn({
        name: 'ProjectId',
        type: 'bigint',
        isNullable: true,
      }),
    );
    const table = await queryRunner.getTable('issue');
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-ProjectId');
    if (!indexKey1) {
      await queryRunner.createIndex(
        'issue',
        new TableIndex({
          name: 'IDX-ProjectId',
          columnNames: ['ProjectId'],
          isUnique: false,
        }),
      );
    }
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('ProjectId') !== -1,
    );
    if (!foreignKey1) {
      await queryRunner.createForeignKey(
        'issue',
        new TableForeignKey({
          name: 'FK-issue-ProjectId',
          columnNames: ['ProjectId'],
          referencedColumnNames: ['Id'],
          referencedTableName: 'project',
          onDelete: 'SET NULL',
          onUpdate: 'NO ACTION',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('issue');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('ProjectId') !== -1,
    );
    if (foreignKey1) {
      await queryRunner.dropForeignKey('issue', foreignKey1);
    }
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-ProjectId');
    if (indexKey1) {
      await queryRunner.dropIndex('issue', 'IDX-ProjectId');
    }
    await queryRunner.dropColumn('issue', 'ProjectId');
  }
}
