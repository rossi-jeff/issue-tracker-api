import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Phone } from './phone.entity';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Phone]), UserModule, AuthModule],
  providers: [PhoneService],
  controllers: [PhoneController],
})
export class PhoneModule {}
