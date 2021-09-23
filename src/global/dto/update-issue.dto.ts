import { ApiProperty } from '@nestjs/swagger';
import { CreateIssueDto } from './create-issue.dto';

export class UpdateIssueDto extends CreateIssueDto {
  @ApiProperty()
  UUID: string;
}
