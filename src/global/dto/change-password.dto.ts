import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty()
  OldPassword?: string;

  @ApiProperty()
  Password?: string;

  @ApiProperty()
  Confirm?: string;
}
