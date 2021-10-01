import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto {
  @ApiProperty()
  Name: string;

  @ApiProperty()
  Details: string;

  @ApiProperty()
  Url: string;
}
