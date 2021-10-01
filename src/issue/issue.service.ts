import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateCommentDto,
  CreateIssueDto,
  FilterIssueDto,
  UpdateIssueDto,
  UuidDto,
} from '../global/dto';
import { NotFoundUUID } from '../global/error';
import { Issue } from './issue.entity';
import * as _ from 'lodash';
import { CommentService } from '../comment/comment.service';
import { Project } from '../project/project.entity';

@Injectable()
export class IssueService {
  private entity: any = Issue;
  private relations: string[] = [
    'Author',
    'AssignedTo',
    'Comments',
    'Project',
    'Comments.Author',
  ];

  constructor(
    @InjectRepository(Issue) private issueRepo: Repository<Issue>,
    @InjectRepository(Project) private projectRepo: Repository<Project>,
    private commentService: CommentService,
  ) {}

  async getIssues(filter?: FilterIssueDto) {
    return await this.issueRepo.find({
      where: filter,
      relations: this.relations,
    });
  }

  async showIssue(uuidDto: UuidDto) {
    const { UUID } = uuidDto;
    const found = await this.issueRepo.findOne({
      where: { UUID },
      relations: this.relations,
    });
    if (!found) throw NotFoundUUID(this.entity, UUID);
    return found;
  }

  async createIssue(createDto: CreateIssueDto, AuthorId: number) {
    const issue = new Issue();
    _.merge(issue, createDto);
    issue.AuthorId = AuthorId;
    if (createDto.ProjectId) {
      const project = await this.projectRepo.findOne({
        where: { Id: createDto.ProjectId },
      });
      issue.SequenceNumber = project.nextSequenceNumber();
      await this.projectRepo.save(project);
    }
    await this.issueRepo.save(issue);
    return issue;
  }

  async updateIssue(updateDto: UpdateIssueDto) {
    const { UUID, ...updates } = updateDto;
    const issue = await this.showIssue({ UUID });
    let ProjectId = issue.ProjectId;
    if (!_.isEmpty(updates)) _.merge(issue, updates);
    if (ProjectId != updateDto.ProjectId) {
      const project = await this.projectRepo.findOne({
        where: { Id: updateDto.ProjectId },
      });
      issue.SequenceNumber = project.nextSequenceNumber();
      await this.projectRepo.save(project);
    }
    await this.issueRepo.save(issue);
    return issue;
  }

  async deleteIssue(uuidDto: UuidDto) {
    const issue = await this.showIssue(uuidDto);
    await this.commentService.deleteByIssueId({ IssueId: issue.Id });
    await this.issueRepo.remove(issue);
    return issue.Id == null;
  }

  async addComment(
    UUID: string,
    createDto: CreateCommentDto,
    AuthorId: number,
  ) {
    const issue = await this.showIssue({ UUID });
    createDto.IssueId = issue.Id;
    createDto.AuthorId = AuthorId;
    return await this.commentService.createComment(createDto);
  }
}
