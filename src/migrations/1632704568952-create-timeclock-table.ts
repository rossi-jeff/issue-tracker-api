import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm";

/*
CREATE TABLE `timeclock` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `UUID` varchar(40) DEFAULT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `Version` int(11) NOT NULL DEFAULT 1,
  `IsDeleted` tinyint(1) NOT NULL DEFAULT 0,
  `startDate` varchar(10) DEFAULT NULL,
  `startTime` varchar(10) DEFAULT NULL,
  `endDate` varchar(10) DEFAULT NULL,
  `endTime` varchar(10) DEFAULT NULL,
  `UserId` bigint(20) DEFAULT NULL,
  `IssueId` bigint(20) DEFAULT NULL,
  `ProjectId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IDX-UserId` (`UserId`),
  KEY `IDX-ProjectId` (`ProjectId`),
  KEY `IDX-IssueId` (`IssueId`),
  CONSTRAINT `FK-timeclock-IssueId` FOREIGN KEY (`IssueId`) REFERENCES `issue` (`Id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `FK-timeclock-ProjectId` FOREIGN KEY (`ProjectId`) REFERENCES `project` (`Id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `FK-timeclock-UserId` FOREIGN KEY (`UserId`) REFERENCES `user` (`Id`) ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
*/

export class createTimeclockTable1632704568952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'timeclock',
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
                    // timeclock columns
                    {
                        name: 'startDate',
                        type: 'varchar',
                        length: '10',
                        isNullable: true,
                    },
                    {
                        name: 'startTime',
                        type: 'varchar',
                        length: '10',
                        isNullable: true,
                    },
                    {
                        name: 'endDate',
                        type: 'varchar',
                        length: '10',
                        isNullable: true,
                    },
                    {
                        name: 'endTime',
                        type: 'varchar',
                        length: '10',
                        isNullable: true,
                    },
                    {
                        name: 'UserId',
                        type: 'bigint',
                        isNullable: true,
                    },
                    {
                        name: 'IssueId',
                        type: 'bigint',
                        isNullable: true,
                    },
                    {
                        name: 'ProjectId',
                        type: 'bigint',
                        isNullable: true,
                    },

                ],
                engine: 'InnoDB',
            }),
            true
        );
        const table = await queryRunner.getTable('timeclock');
        const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UserId');
        if (!indexKey1) {
            await queryRunner.createIndex(
                'timeclock',
                new TableIndex({
                name: 'IDX-UserId',
                columnNames: ['UserId'],
                isUnique: false,
                }),
            );
        }
        const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-ProjectId');
        if (!indexKey2) {
            await queryRunner.createIndex(
                'timeclock',
                new TableIndex({
                name: 'IDX-ProjectId',
                columnNames: ['ProjectId'],
                isUnique: false,
                }),
            );
        }
        const indexKey3 = table.indices.find((idx) => idx.name === 'IDX-IssueId');
        if (!indexKey3) {
            await queryRunner.createIndex(
                'timeclock',
                new TableIndex({
                name: 'IDX-IssueId',
                columnNames: ['IssueId'],
                isUnique: false,
                }),
            );
        }
        const foreignKey1 = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('UserId') !== -1,
        );
        if (!foreignKey1) {
            await queryRunner.createForeignKey(
                'timeclock',
                new TableForeignKey({
                    name: 'FK-timeclock-UserId',
                    columnNames: ['UserId'],
                    referencedColumnNames: ['Id'],
                    referencedTableName: 'user',
                    onDelete: 'SET NULL',
                    onUpdate: 'NO ACTION',
                }),
            );
        }
        const foreignKey2 = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('ProjectId') !== -1,
        );
        if (!foreignKey2) {
            await queryRunner.createForeignKey(
                'timeclock',
                new TableForeignKey({
                    name: 'FK-timeclock-ProjectId',
                    columnNames: ['ProjectId'],
                    referencedColumnNames: ['Id'],
                    referencedTableName: 'project',
                    onDelete: 'SET NULL',
                    onUpdate: 'NO ACTION',
                }),
            );
        }
        const foreignKey3 = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('IssueId') !== -1,
        );
        if (!foreignKey3) {
            await queryRunner.createForeignKey(
                'timeclock',
                new TableForeignKey({
                    name: 'FK-timeclock-IssueId',
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
        const table = await queryRunner.getTable('timeclock');
        const foreignKey1 = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('UserId') !== -1,
        );
        if (foreignKey1) {
            await queryRunner.dropForeignKey('timeclock', foreignKey1);
        }
        const foreignKey2 = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('ProjectId') !== -1,
        );
        if (foreignKey2) {
            await queryRunner.dropForeignKey('timeclock', foreignKey2);
        }
        const foreignKey3 = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf('IssueId') !== -1,
        );
        if (foreignKey3) {
            await queryRunner.dropForeignKey('timeclock', foreignKey3);
        }
        const indexKey1 = table.indices.find((idx) => idx.name === 'IDX-UserId');
        if (indexKey1) {
            await queryRunner.dropIndex('timeclock', 'IDX-UserId');
        }
        const indexKey2 = table.indices.find((idx) => idx.name === 'IDX-ProjectId');
        if (indexKey2) {
            await queryRunner.dropIndex('timeclock', 'IDX-ProjectId');
        }
        const indexKey3 = table.indices.find((idx) => idx.name === 'IDX-IssueId');
        if (indexKey3) {
            await queryRunner.dropIndex('timeclock', 'IDX-IssueId');
        }
        await queryRunner.dropTable(
            new Table({
                name: 'timeclock',
            }),
            true,
        );
    }

}
