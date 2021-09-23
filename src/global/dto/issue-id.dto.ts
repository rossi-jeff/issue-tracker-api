import { ApiProperty } from '@nestjs/swagger';

export class IssueIdDto {
  @ApiProperty()
  IssueId?: number;
}
