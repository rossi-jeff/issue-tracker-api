import { ApiProperty } from '@nestjs/swagger';
import { CreateEmailDto } from './create-email.dto';
import { CreatePhoneDto } from './create-phone.dto';
import { CredentialsDto } from './credentials.dto';
import { NameDto } from './name.dto';
import { RoleType } from '../enum';

export class CreateUserDto {
  @ApiProperty()
  Credentials?: CredentialsDto;

  @ApiProperty()
  Name?: NameDto;

  @ApiProperty()
  Roles?: RoleType[];

  @ApiProperty({ type: [CreatePhoneDto] })
  Phones?: CreatePhoneDto[];

  @ApiProperty({ type: [CreateEmailDto] })
  Emails?: CreateEmailDto[];
}
