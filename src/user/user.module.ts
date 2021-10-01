import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Phone } from '../phone/phone.entity';
import { Email } from '../email/email.entity';
import { Role } from '../role/role.entity';
import { EmailService } from '../email/email.service';
import { PhoneService } from '../phone/phone.service';
import { RoleService } from '../role/role.service';
import { AuthModule } from '../auth/auth.module';
import { TimeclockService } from '../timeclock/timeclock.service';
import { Timeclock } from '../timeclock/timeclock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Phone, Email, Role, Timeclock]),
    forwardRef(() => AuthModule),
  ],
  providers: [
    UserService,
    EmailService,
    PhoneService,
    RoleService,
    TimeclockService,
  ],
  controllers: [UserController],
})
export class UserModule {}
