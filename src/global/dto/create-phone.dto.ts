import { ApiProperty } from '@nestjs/swagger';
import { PhoneTypeEnum, UsageEnum } from '../enum';
import { EnumToArray } from '../util';

export class CreatePhoneDto {
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
}
