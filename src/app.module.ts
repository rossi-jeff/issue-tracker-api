import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { IssueModule } from './issue/issue.module';
import { PhoneModule } from './phone/phone.module';
import { EmailModule } from './email/email.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from './session/session.module';
import { CommentModule } from './comment/comment.module';
import { RegisterModule } from './register/register.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    IssueModule,
    PhoneModule,
    EmailModule,
    RoleModule,
    SessionModule,
    CommentModule,
    RegisterModule,
    AuthModule,
  ],
})
export class AppModule {}
