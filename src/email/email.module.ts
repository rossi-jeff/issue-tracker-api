import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Email } from './email.entity';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Email]), UserModule, AuthModule],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
