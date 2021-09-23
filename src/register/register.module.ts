import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from '../email/email.entity';
import { EmailService } from '../email/email.service';
import { Phone } from '../phone/phone.entity';
import { PhoneService } from '../phone/phone.service';
import { Role } from '../role/role.entity';
import { RoleService } from '../role/role.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Phone, Email, Role])],
  providers: [
    RegisterService,
    UserService,
    EmailService,
    PhoneService,
    RoleService,
  ],
  controllers: [RegisterController],
})
export class RegisterModule {}
