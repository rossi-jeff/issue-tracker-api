import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from '../email/email.entity';
import { EmailService } from '../email/email.service';
import { Phone } from '../phone/phone.entity';
import { PhoneService } from '../phone/phone.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TimeclockService } from '../timeclock/timeclock.service';
import { Timeclock } from '../timeclock/timeclock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Phone, Email, Timeclock])],
  providers: [
    RegisterService,
    UserService,
    EmailService,
    PhoneService,
    TimeclockService,
  ],
  controllers: [RegisterController],
})
export class RegisterModule {}
