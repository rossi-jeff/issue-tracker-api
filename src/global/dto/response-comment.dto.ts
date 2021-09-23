import { ApiProperty } from '@nestjs/swagger';
import { ResponseIssueDto } from '.';
import { CreateCommentDto } from './create-comment.dto';
import { ResponseUserDto } from './response-user.dto';

export class ResponseCommentDto extends CreateCommentDto {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  UUID: string;

  @ApiProperty()
  Created: string;

  @ApiProperty()
  Updated: string;

  @ApiProperty()
  Version: number;

  @ApiProperty()
  IsDeleted?: boolean;

  @ApiProperty({ type: () => ResponseUserDto })
  Author?: ResponseUserDto;

  @ApiProperty({ type: () => ResponseIssueDto })
  Issue?: ResponseIssueDto;
}
