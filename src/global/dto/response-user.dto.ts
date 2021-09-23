import { ApiProperty } from '@nestjs/swagger';
import { NameDto } from './name.dto';
import { CredentialsDto } from './credentials.dto';
import { ResponseEmailDto } from './response-email.dto';
import { ResponsePhoneDto } from './response-phone.dto';
import { ResponseRoleDto } from './respone-role.dto';

export class ResponseUserDto {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  UUID: string;

  @ApiProperty()
  Credentials?: CredentialsDto;

  @ApiProperty()
  Name?: NameDto;

  @ApiProperty({ type: [ResponsePhoneDto] })
  Phones?: ResponsePhoneDto[];

  @ApiProperty({ type: [ResponseEmailDto] })
  Emails?: ResponseEmailDto[];

  @ApiProperty({ type: [ResponseRoleDto] })
  Roles?: ResponseRoleDto[];

  @ApiProperty()
  Created: string;

  @ApiProperty()
  Updated: string;

  @ApiProperty()
  Version: number;

  @ApiProperty()
  IsDeleted?: boolean;
}
