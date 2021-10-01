import { Module } from '@nestjs/common';
import { TimeclockService } from './timeclock.service';
import { TimeclockController } from './timeclock.controller';
import { Timeclock } from './timeclock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Issue } from '../issue/issue.entity';
import { Project } from '../project/project.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Timeclock, User, Issue, Project]),
    UserModule,
    AuthModule,
  ],
  providers: [TimeclockService],
  controllers: [TimeclockController],
})
export class TimeclockModule {}
