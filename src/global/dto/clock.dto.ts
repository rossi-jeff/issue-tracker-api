import { ApiProperty } from '@nestjs/swagger';

export class ClockDto {
  @ApiProperty()
  Date?: string;

  @ApiProperty()
  Time?: string;
}
