import { ApiProperty } from '@nestjs/swagger';

export class LoginSessionDto {
  @ApiProperty()
  Name?: string;

  @ApiProperty()
  UserName?: string;

  @ApiProperty()
  Active?: boolean;

  @ApiProperty()
  UserId?: number;
}
