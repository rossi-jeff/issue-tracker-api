import { ApiProperty } from '@nestjs/swagger';

export class ResponseLoginDto {
  @ApiProperty()
  Name: string;

  @ApiProperty()
  UserName: string;

  @ApiProperty()
  Token: string;

  @ApiProperty()
  UUID: string;

  @ApiProperty()
  SessionId: string;
}
