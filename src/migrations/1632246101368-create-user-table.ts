import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

/*
CREATE TABLE `user` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `UUID` varchar(40) DEFAULT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `Version` int(11) NOT NULL DEFAULT 1,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT 0,
  `credentialsUsername` varchar(50) DEFAULT NULL,
  `credentialsPassword` varchar(255) DEFAULT NULL,
  `nameFirst` varchar(50) DEFAULT NULL,
  `nameMiddle` varchar(50) DEFAULT NULL,
  `nameLast` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `IDX-credentialsUsername` (`credentialsUsername`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
*/

export class createUserTable1632246101368 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
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
          // credentials embed
          {
            name: 'credentialsUsername',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'credentialsPassword',
            type: 'varchar',
            isNullable: true,
          },
          // name embed
          {
            name: 'nameFirst',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'nameMiddle',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'nameLast',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );
    const table = await queryRunner.getTable('user');
    const indexKey1 = table.indices.find(
      (idx) => idx.name === 'IDX-credentialsUsername',
    );
    if (!indexKey1) {
      await queryRunner.createIndex(
        'user',
        new TableIndex({
          name: 'IDX-credentialsUsername',
          columnNames: ['credentialsUsername'],
          isUnique: true,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user');
    const indexKey1 = table.indices.find(
      (idx) => idx.name === 'IDX-credentialsUsername',
    );
    if (indexKey1) {
      await queryRunner.dropIndex('user', 'IDX-credentialsUsername');
    }
    await queryRunner.dropTable(
      new Table({
        name: 'user',
      }),
      true,
    );
  }
}
