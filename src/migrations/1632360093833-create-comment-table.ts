import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

/*
CREATE TABLE `comment` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `UUID` varchar(40) DEFAULT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `Version` int(11) NOT NULL DEFAULT 1,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT 0,
  `Title` varchar(255) DEFAULT NULL,
  `Details` text DEFAULT NULL,
  `AuthorId` bigint(20) DEFAULT NULL,
  `IssueId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IDX-AuthorId` (`AuthorId`),
  KEY `IDX-IssueId` (`IssueId`),
  CONSTRAINT `FK-comment-AuthorId` FOREIGN KEY (`AuthorId`) REFERENCES `user` (`Id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `FK-comment-IssueId` FOREIGN KEY (`IssueId`) REFERENCES `issue` (`Id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
*/

export class createCommentTable1632360093833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comment',
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
          // comment columns
          {
            name: 'Title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Details',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'AuthorId',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'IssueId',
            type: 'bigint',
            isNullable: true,
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );
    const table = await queryRunner.getTable('comment');
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-AuthorId');
    if (!indexKey1) {
      await queryRunner.createIndex(
        'comment',
        new TableIndex({
          name: 'IDX-AuthorId',
          columnNames: ['AuthorId'],
          isUnique: false,
        }),
      );
    }
    const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-IssueId');
    if (!indexKey2) {
      await queryRunner.createIndex(
        'comment',
        new TableIndex({
          name: 'IDX-IssueId',
          columnNames: ['IssueId'],
          isUnique: false,
        }),
      );
    }
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('AuthorId') !== -1,
    );
    if (!foreignKey1) {
      await queryRunner.createForeignKey(
        'comment',
        new TableForeignKey({
          name: 'FK-comment-AuthorId',
          columnNames: ['AuthorId'],
          referencedColumnNames: ['Id'],
          referencedTableName: 'user',
          onDelete: 'SET NULL',
          onUpdate: 'NO ACTION',
        }),
      );
    }
    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('IssueId') !== -1,
    );
    if (!foreignKey2) {
      await queryRunner.createForeignKey(
        'comment',
        new TableForeignKey({
          name: 'FK-comment-IssueId',
          columnNames: ['IssueId'],
          referencedColumnNames: ['Id'],
          referencedTableName: 'issue',
          onDelete: 'SET NULL',
          onUpdate: 'NO ACTION',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('comment');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('AuthorId') !== -1,
    );
    if (foreignKey1) {
      await queryRunner.dropForeignKey('comment', foreignKey1);
    }
    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('IssueId') !== -1,
    );
    if (foreignKey2) {
      await queryRunner.dropForeignKey('comment', foreignKey2);
    }
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-AuthorId');
    if (indexKey1) {
      await queryRunner.dropIndex('comment', 'IDX-AuthorId');
    }
    const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-IssueId');
    if (indexKey2) {
      await queryRunner.dropIndex('comment', 'IDX-IssueId');
    }
    await queryRunner.dropTable(
      new Table({
        name: 'comment',
      }),
      true,
    );
  }
}
