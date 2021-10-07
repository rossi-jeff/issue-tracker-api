import { ApiProperty } from '@nestjs/swagger';
import { ResponseEmailDto } from './response-email.dto';
import { ResponsePhoneDto } from './response-phone.dto';
import { CreateUserDto } from './create-user.dto';

export class ResponseUserDto extends CreateUserDto {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  UUID: string;

  @ApiProperty({ type: [ResponsePhoneDto] })
  Phones?: ResponsePhoneDto[];

  @ApiProperty({ type: [ResponseEmailDto] })
  Emails?: ResponseEmailDto[];

  @ApiProperty()
  Created: string;

  @ApiProperty()
  Updated: string;

  @ApiProperty()
  Version: number;

  @ApiProperty()
  IsDeleted?: boolean;
}
