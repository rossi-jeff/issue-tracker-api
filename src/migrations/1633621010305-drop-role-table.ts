import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class dropRoleTable1633621010305 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('role');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('UserId') !== -1,
    );
    if (foreignKey1) {
      await queryRunner.dropForeignKey('role', foreignKey1);
    }
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UserId');
    if (indexKey1) {
      await queryRunner.dropIndex('role', 'IDX-UserId');
    }
    await queryRunner.dropTable(
      new Table({
        name: 'role',
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
