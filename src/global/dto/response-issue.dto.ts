import { ApiProperty } from '@nestjs/swagger';
import { ResponseCommentDto, ResponseUserDto } from '.';
import { CreateIssueDto } from './create-issue.dto';
import { ResponseProjectDto } from './response-project.dto';

export class ResponseIssueDto extends CreateIssueDto {
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

  @ApiProperty({ type: () => ResponseUserDto })
  AssignedTo?: ResponseUserDto;

  @ApiProperty({ type: () => ResponseProjectDto })
  Project?: ResponseProjectDto;

  @ApiProperty({ type: [ResponseCommentDto] })
  Comments?: ResponseCommentDto[];
}
