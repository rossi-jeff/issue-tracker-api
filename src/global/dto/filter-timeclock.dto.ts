import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterTimeclockDto {
  @ApiPropertyOptional()
  UserId?: number;

  @ApiPropertyOptional()
  ProjectId?: number;

  @ApiPropertyOptional()
  IssueId?: number;

  @ApiPropertyOptional()
  StartDate?: string;

  @ApiPropertyOptional()
  EndDate?: string;
}
