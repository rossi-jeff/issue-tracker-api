import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { User } from '../user/user.entity';
import { Issue } from '../issue/issue.entity';
import { CommentController } from './comment.controller';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Issue]),
    UserModule,
    AuthModule,
  ],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
