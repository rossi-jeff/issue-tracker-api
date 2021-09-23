import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

/*
CREATE TABLE `session` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `UUID` varchar(40) DEFAULT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `Version` int(11) NOT NULL DEFAULT 1,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT 0,
  `Name` varchar(255) DEFAULT NULL,
  `UserName` varchar(255) DEFAULT NULL,
  `Active` tinyint(1) NOT NULL DEFAULT 1,
  `UserId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IDX-UserId` (`UserId`),
  CONSTRAINT `FK-session-UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
*/

export class createSessionTable1632341811967 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'session',
        columns: [
          // base model columns
          {
            name: 'Id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'UUID',
            type: 'varchar',
            length: '40',
            isNullable: true,
          },
          {
            name: 'Created',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'Updated',
            type: 'timestamp',
            isNullable: false,
            default: '0',
          },
          {
            name: 'Version',
            type: 'int',
            length: '11',
            isNullable: false,
            default: '1',
          },
          {
            name: 'IsDeleted',
            type: 'boolean',
            default: false,
          },
          // session columns
          {
            name: 'Name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'UserName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'UserId',
            type: 'bigint',
            isNullable: true,
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );
    const table = await queryRunner.getTable('session');
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UserId');
    if (!indexKey1) {
      await queryRunner.createIndex(
        'session',
        new TableIndex({
          name: 'IDX-UserId',
          columnNames: ['UserId'],
          isUnique: false,
        }),
      );
    }
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('UserId') !== -1,
    );
    if (!foreignKey1) {
      await queryRunner.createForeignKey(
        'session',
        new TableForeignKey({
          name: 'FK-session-UserId',
          columnNames: ['UserId'],
          referencedColumnNames: ['Id'],
          referencedTableName: 'user',
          onDelete: 'SET NULL',
          onUpdate: 'NO ACTION',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('session');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('UserId') !== -1,
    );
    if (foreignKey1) {
      await queryRunner.dropForeignKey('session', foreignKey1);
    }
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UserId');
    if (indexKey1) {
      await queryRunner.dropIndex('session', 'IDX-UserId');
    }
    await queryRunner.dropTable(
      new Table({
        name: 'session',
      }),
      true,
    );
  }
}
