import { Module } from '@nestjs/common';
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

@Module({
  imports: [TypeOrmModule.forFeature([User, Phone, Email, Role])],
  providers: [UserService, EmailService, PhoneService, RoleService],
  controllers: [UserController],
})
export class UserModule {}
