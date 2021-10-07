import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { IssueModule } from './issue/issue.module';
import { PhoneModule } from './phone/phone.module';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from './session/session.module';
import { CommentModule } from './comment/comment.module';
import { RegisterModule } from './register/register.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { TimeclockModule } from './timeclock/timeclock.module';
import { ResourceModule } from './resource/resource.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    IssueModule,
    PhoneModule,
    EmailModule,
    SessionModule,
    CommentModule,
    RegisterModule,
    AuthModule,
    ProjectModule,
    TimeclockModule,
    ResourceModule,
  ],
})
export class AppModule {}
