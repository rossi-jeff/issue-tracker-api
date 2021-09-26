import { ApiProperty } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { ResponseIssueDto } from './response-issue.dto';

export class ResponseProjectDto extends CreateProjectDto {
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

  @ApiProperty({ type: [ResponseIssueDto] })
  Issues?: ResponseIssueDto[];
}
