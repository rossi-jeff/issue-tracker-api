import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  Name: string;

  @ApiProperty()
  Details: string;
}
