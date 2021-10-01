import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from '../email/email.entity';
import { EmailService } from '../email/email.service';
import { Phone } from '../phone/phone.entity';
import { PhoneService } from '../phone/phone.service';
import { Role } from '../role/role.entity';
import { RoleService } from '../role/role.service';
import { Session } from '../session/session.entity';
import { SessionService } from '../session/session.service';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { TimeclockService } from '../timeclock/timeclock.service';
import { Timeclock } from '../timeclock/timeclock.entity';

const secret = process.env.JWT_SECRET || 'Su93r53cre7!';
const expiresIn = process.env.JWT_EXPIRES || '7d';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Session, Phone, Email, Role, Timeclock]),
    forwardRef(() => UserModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret,
      signOptions: {
        expiresIn,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    SessionService,
    UserService,
    EmailService,
    PhoneService,
    RoleService,
    TimeclockService,
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
