import { ApiProperty } from '@nestjs/swagger';

export class JwtPayloadDto {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  UUID: string;

  @ApiProperty()
  Roles: string[];
}
