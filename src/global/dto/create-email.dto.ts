import { ApiProperty } from '@nestjs/swagger';
import { UsageEnum } from '../enum';
import { EnumToArray } from '../util';

export class CreateEmailDto {
  @ApiProperty()
  Address?: string;

  @ApiProperty({ enum: EnumToArray(UsageEnum) })
  Usage?: UsageEnum;

  @ApiProperty()
  Public?: boolean;

  @ApiProperty()
  UserId?: number;
}
