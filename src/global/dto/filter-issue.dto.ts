import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterIssueDto {
  @ApiPropertyOptional()
  Title?: string;

  @ApiPropertyOptional()
  Details?: string;

  @ApiPropertyOptional()
  Type?: string;

  @ApiPropertyOptional()
  Status?: string;

  @ApiPropertyOptional()
  Priority?: string;

  @ApiPropertyOptional()
  Complexity?: string;

  @ApiPropertyOptional()
  AuthorId?: number;

  @ApiPropertyOptional()
  AssignedToId?: number;
}
