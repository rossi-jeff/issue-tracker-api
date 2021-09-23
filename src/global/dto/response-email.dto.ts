import { ApiProperty } from '@nestjs/swagger';
import { UsageEnum } from '../enum';
import { EnumToArray } from '../util';

export class ResponseEmailDto {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  UUID: string;

  @ApiProperty()
  Address?: string;

  @ApiProperty({ enum: EnumToArray(UsageEnum) })
  Usage?: UsageEnum;

  @ApiProperty()
  Public?: boolean;

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
