import { ApiProperty } from '@nestjs/swagger';

export class UuidDto {
  @ApiProperty()
  UUID: string;
}
