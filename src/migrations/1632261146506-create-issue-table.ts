import {
  ComplexityArray,
  IssueTypeArray,
  PriorityArray,
  StatusArray,
} from '../global/array';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

/*
CREATE TABLE `issue` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `UUID` varchar(40) DEFAULT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `Version` int(11) NOT NULL DEFAULT 1,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT 0,
  `Title` varchar(255) DEFAULT NULL,
  `Details` text DEFAULT NULL,
  `AuthorId` bigint(20) DEFAULT NULL,
  `AssignedToId` bigint(20) DEFAULT NULL,
  `Type` enum('Bug','Feature Request','Customer Issue','Internal Cleanup','Improvement','Process','Vulnerability') DEFAULT NULL,
  `Status` enum('New','Assigned','Accepted','Fixed','Fixed (Verified)','Won''t Fix (Not reproducible)','Won''t Fix (Intended behavior)','Won''t Fix (Obsolete)','Won''t Fix (Infeasible)','Duplicate') DEFAULT NULL,
  `Priority` enum('Critical','Urgent','High','Medium','Low','Ignore') DEFAULT NULL,
  `Complexity` enum('1','2','3','5','8','13','21') DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IDX-AuthorId` (`AuthorId`),
  KEY `IDX-AssignedToId` (`AssignedToId`),
  CONSTRAINT `FK-issue-AssignedToId` FOREIGN KEY (`AssignedToId`) REFERENCES `user` (`Id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `FK-issue-AuthorId` FOREIGN KEY (`AuthorId`) REFERENCES `user` (`Id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
*/

export class createIssueTable1632261146506 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'issue',
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
          // issue columns
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
            name: 'AssignedToId',
            type: 'bigint',
            isNullable: true,
          },
          // enums
          {
            name: 'Type',
            type: 'enum',
            enum: IssueTypeArray,
            isNullable: true,
          },
          {
            name: 'Status',
            type: 'enum',
            enum: StatusArray,
            isNullable: true,
          },
          {
            name: 'Priority',
            type: 'enum',
            enum: PriorityArray,
            isNullable: true,
          },
          {
            name: 'Complexity',
            type: 'enum',
            enum: ComplexityArray,
            isNullable: true,
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );
    const table = await queryRunner.getTable('issue');
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-AuthorId');
    if (!indexKey1) {
      await queryRunner.createIndex(
        'issue',
        new TableIndex({
          name: 'IDX-AuthorId',
          columnNames: ['AuthorId'],
          isUnique: false,
        }),
      );
    }
    const indexKey2 = table.indices.find(
      (idx) => idx.name === 'IDX-AssignedToId',
    );
    if (!indexKey2) {
      await queryRunner.createIndex(
        'issue',
        new TableIndex({
          name: 'IDX-AssignedToId',
          columnNames: ['AssignedToId'],
          isUnique: false,
        }),
      );
    }
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('AuthorId') !== -1,
    );
    if (!foreignKey1) {
      await queryRunner.createForeignKey(
        'issue',
        new TableForeignKey({
          name: 'FK-issue-AuthorId',
          columnNames: ['AuthorId'],
          referencedColumnNames: ['Id'],
          referencedTableName: 'user',
          onDelete: 'SET NULL',
          onUpdate: 'NO ACTION',
        }),
      );
    }
    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('AssignedToId') !== -1,
    );
    if (!foreignKey2) {
      await queryRunner.createForeignKey(
        'issue',
        new TableForeignKey({
          name: 'FK-issue-AssignedToId',
          columnNames: ['AssignedToId'],
          referencedColumnNames: ['Id'],
          referencedTableName: 'user',
          onDelete: 'SET NULL',
          onUpdate: 'NO ACTION',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('issue');
    const foreignKey1 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('AuthorId') !== -1,
    );
    if (foreignKey1) {
      await queryRunner.dropForeignKey('issue', foreignKey1);
    }
    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('AssignedToId') !== -1,
    );
    if (foreignKey2) {
      await queryRunner.dropForeignKey('issue', foreignKey2);
    }
    const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-AuthorId');
    if (indexKey1) {
      await queryRunner.dropIndex('issue', 'IDX-AuthorId');
    }
    const indexKey2 = table.indices.find(
      (idx) => idx.name === 'IDX-AssignedToId',
    );
    if (indexKey2) {
      await queryRunner.dropIndex('issue', 'IDX-AssignedToId');
    }
    await queryRunner.dropTable(
      new Table({
        name: 'issue',
      }),
      true,
    );
  }
}
