import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto, ResponseCommentDto } from '../global/dto';
import { CommentService } from './comment.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseCommentDto })
  async showComment(@Param('UUID') UUID: string, @Res() response: Response) {
    response
      .status(HttpStatus.OK)
      .send(await this.commentService.showComment({ UUID }));
  }

  @Patch(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseCommentDto })
  async updateComment(
    @Param('UUID') UUID: string,
    @Body() data: CreateCommentDto,
    @Res() response: Response,
    @Req() req: any,
  ) {
    response
      .status(HttpStatus.OK)
      .send(await this.commentService.updateComment({ UUID, ...data }));
  }

  @Delete(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'No Content' })
  async deleteComment(
    @Param('UUID') UUID: string,
    @Res() response: Response,
    @Req() req: any,
  ) {
    await this.commentService.deleteComment({ UUID });
    response.status(HttpStatus.NO_CONTENT).send();
  }
}
