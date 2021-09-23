import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  Username: string;

  @ApiProperty()
  Password: string;
}
