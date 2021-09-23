import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Issue } from './issue.entity';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../comment/comment.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Issue, Comment]),
    UserModule,
    AuthModule,
  ],
  providers: [IssueService, CommentService],
  controllers: [IssueController],
})
export class IssueModule {}
