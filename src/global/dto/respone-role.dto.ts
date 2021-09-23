import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../enum';
import { EnumToArray } from '../util';

export class ResponseRoleDto {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  UUID: string;

  @ApiProperty({ enum: EnumToArray(RoleEnum) })
  Name?: RoleEnum;

  @ApiProperty()
  UserId?: number;

  @ApiProperty()
  Created?: string;

  @ApiProperty()
  Updated?: string;

  @ApiProperty()
  Version?: number;

  @ApiProperty()
  IsDeleted?: boolean;
}
