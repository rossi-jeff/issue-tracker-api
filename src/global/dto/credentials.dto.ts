import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty()
  Username?: string;

  @ApiProperty()
  Password?: string;
}
