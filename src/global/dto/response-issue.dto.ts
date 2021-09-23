import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from '.';
import { CreateIssueDto } from './create-issue.dto';

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
}
