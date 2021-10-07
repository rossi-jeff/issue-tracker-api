import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Phone } from '../phone/phone.entity';
import { Email } from '../email/email.entity';
import { EmailService } from '../email/email.service';
import { PhoneService } from '../phone/phone.service';
import { AuthModule } from '../auth/auth.module';
import { TimeclockService } from '../timeclock/timeclock.service';
import { Timeclock } from '../timeclock/timeclock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Phone, Email, Timeclock]),
    forwardRef(() => AuthModule),
  ],
  providers: [UserService, EmailService, PhoneService, TimeclockService],
  controllers: [UserController],
})
export class UserModule {}
