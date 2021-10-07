import { MigrationInterface, QueryRunner } from 'typeorm';
import { EnumToArray, sample } from '../global/util';
import { RoleEnum } from '../global/enum';
import { User } from '../user/user.entity';

const roles = EnumToArray(RoleEnum);

export class populateUserRoles1633616659853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const userRepo = await manager.getRepository(User);

    const results: User[] = await userRepo.find();

    for (let user of results) {
      if (!user.Roles) user.Roles = [];
      user.Roles.push(sample(roles));
      await userRepo.save(user);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
