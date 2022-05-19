import { MigrationInterface, QueryRunner } from 'typeorm';
import { EnumToArray, sample } from '../global/util';
import * as faker from 'faker';
import * as bcrypt from 'bcrypt';
import { PhoneTypeEnum, RoleEnum, UsageEnum } from '../global/enum';
import { v4 } from 'uuid';

const count = {
  users: 30,
};
const userIds = [];
const defaultPW = 'S3cr3t!!';
const SaltRounds = 10;
const usage = EnumToArray(UsageEnum);
const phoneTypes = EnumToArray(PhoneTypeEnum);
const booleans = [true, false];
const roles = EnumToArray(RoleEnum);

let user,
  userObj: any,
  UserId,
  phoneObj: any,
  phoneCount,
  emailObj: any,
  emailCount;

export class seedUsers1652807031930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.connection;
    const userRepo = await manager.getRepository('user');
    const phoneRepo = await manager.getRepository('phone');
    const emailRepo = await manager.getRepository('email');

    for (let i = 0; i < count.users; i++) {
      userObj = {
        Credentials: {
          Username: faker.internet.userName(),
          Password: bcrypt.hashSync(defaultPW, SaltRounds),
        },
        Name: {
          First: faker.name.firstName(),
          Middle: faker.name.firstName(),
          Last: faker.name.lastName(),
        },
        UUID: v4(),
        Roles: [],
      };
      userObj.Roles.push(roles[Math.floor(Math.random() * roles.length)]);
      user = await userRepo.save(userObj);
      UserId = user.Id;
      userIds.push(UserId);

      phoneCount = Math.ceil(Math.random() * 2);
      for (let j = 0; j < phoneCount; j++) {
        phoneObj = {
          UserId,
          Number: faker.phone.phoneNumber(),
          Usage: sample(usage),
          Type: sample(phoneTypes),
          Public: sample(booleans),
          UUID: v4(),
        };
        await phoneRepo.save(phoneObj);
      }

      emailCount = Math.ceil(Math.random() * 2);
      for (let k = 0; k < emailCount; k++) {
        emailObj = {
          UserId,
          Address: faker.internet.email(),
          Usage: sample(usage),
          Public: sample(booleans),
          UUID: v4(),
        };
        await emailRepo.save(emailObj);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
