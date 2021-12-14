import { ApiProperty } from '@nestjs/swagger';

export class DeletedCountDto {
  @ApiProperty()
  count: number;
}
