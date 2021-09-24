import { ApiPropertyOptional } from "@nestjs/swagger";

export class FilterUserDto {
  @ApiPropertyOptional()
  First?: string;

  @ApiPropertyOptional()
  Middle?: string;

  @ApiPropertyOptional()
  Last?: string;

  @ApiPropertyOptional()
  Username?: string;
}