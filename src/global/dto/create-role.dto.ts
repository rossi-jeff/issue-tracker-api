import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../enum';
import { EnumToArray } from '../util';

export class CreateRoleDto {
  @ApiProperty({ enum: EnumToArray(RoleEnum) })
  Name?: RoleEnum;

  @ApiProperty()
  UserId?: number;
}
