import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateCommentDto,
  CreateIssueDto,
  FilterIssueDto,
  ResponseCommentDto,
  ResponseIssueDto,
} from '../global/dto';
import { IssueService } from './issue.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Issues')
@Controller('issue')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [ResponseIssueDto],
  })
  async getIssues(@Res() response: Response, @Query() filter?: FilterIssueDto) {
    response
      .status(HttpStatus.OK)
      .send(await this.issueService.getIssues(filter));
  }

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseIssueDto })
  async showIssue(@Param('UUID') UUID: string, @Res() response: Response) {
    response
      .status(HttpStatus.OK)
      .send(await this.issueService.showIssue({ UUID }));
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Created', type: ResponseIssueDto })
  async createIssue(
    @Body() data: CreateIssueDto,
    @Res() response: Response,
    @Req() req: any,
  ) {
    response
      .status(HttpStatus.CREATED)
      .send(await this.issueService.createIssue(data, req.user.Id));
  }

  @Patch(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseIssueDto })
  async updateIssue(
    @Param('UUID') UUID: string,
    @Body() data: CreateIssueDto,
    @Res() response: Response,
    @Req() req: any,
  ) {
    response
      .status(HttpStatus.OK)
      .send(await this.issueService.updateIssue({ UUID, ...data }));
  }

  @Delete(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'No Content' })
  async deleteIssue(
    @Param('UUID') UUID: string,
    @Res() response: Response,
    @Req() req: any,
  ) {
    await this.issueService.deleteIssue({ UUID });
    response.status(HttpStatus.NO_CONTENT).send();
  }

  @Post(':UUID/comment')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: ResponseCommentDto,
  })
  async addComment(
    @Param('UUID') UUID: string,
    @Body() data: CreateCommentDto,
    @Res() response: Response,
    @Req() req: any,
  ) {
    response
      .status(HttpStatus.CREATED)
      .send(await this.issueService.addComment(UUID, data, req.user.Id));
  }
}
