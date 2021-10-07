import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { EnumToArray } from '../global/util';
import { RoleEnum } from '../global/enum';

export class addRoleSetColumnToUser1633615814406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'Roles',
        type: 'set',
        enum: EnumToArray(RoleEnum),
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('user', 'Roles');
  }
}
