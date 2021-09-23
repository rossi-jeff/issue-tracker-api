import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCommentDto,
  IssueIdDto,
  UpdateCommentDto,
  UuidDto,
} from '../global/dto';
import { NotFoundUUID } from '../global/error';
import { Comment } from './comment.entity';
import * as _ from 'lodash';

@Injectable()
export class CommentService {
  private entity: any = Comment;
  private relations: string[] = ['Author', 'Issue'];

  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  async showComment(uuidDto: UuidDto) {
    const { UUID } = uuidDto;
    const found = await this.commentRepo.findOne({
      where: { UUID },
      relations: this.relations,
    });
    if (!found) throw NotFoundUUID(this.entity, UUID);
    return found;
  }

  async createComment(createDto: CreateCommentDto) {
    const comment = new Comment();
    _.merge(comment, createDto);
    await this.commentRepo.save(comment);
    return comment;
  }

  async updateComment(updateDto: UpdateCommentDto) {
    const { UUID, ...updates } = updateDto;
    const comment = await this.showComment({ UUID });
    if (!_.isEmpty(updates)) _.merge(comment, updates);
    await this.commentRepo.save(comment);
    return comment;
  }

  async deleteComment(uuidDto: UuidDto) {
    const comment = await this.showComment(uuidDto);
    await this.commentRepo.remove(comment);
    return comment.Id == null;
  }

  async deleteByIssueId(issueDto: IssueIdDto) {
    await this.commentRepo.delete(issueDto);
  }
}
