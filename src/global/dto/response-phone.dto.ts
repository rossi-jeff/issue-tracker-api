import { ApiProperty } from '@nestjs/swagger';
import { PhoneTypeEnum, UsageEnum } from '../enum';
import { EnumToArray } from '../util/enum-to-array';

export class ResponsePhoneDto {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  UUID: string;

  @ApiProperty()
  Number?: string;

  @ApiProperty({ enum: EnumToArray(PhoneTypeEnum) })
  Type?: PhoneTypeEnum;

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
