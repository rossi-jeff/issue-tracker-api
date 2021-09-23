import { ApiProperty } from '@nestjs/swagger';

export class NameDto {
  @ApiProperty()
  First?: string;

  @ApiProperty()
  Middle?: string;

  @ApiProperty()
  Last?: string;
}
