import { ApiProperty } from '@nestjs/swagger';
import { CreateEmailDto } from './create-email.dto';
import { CreatePhoneDto } from './create-phone.dto';
import { CreateRoleDto } from './create-role.dto';
import { CredentialsDto } from './credentials.dto';
import { NameDto } from './name.dto';

export class CreateUserDto {
  @ApiProperty()
  Credentials?: CredentialsDto;

  @ApiProperty()
  Name?: NameDto;

  @ApiProperty({ type: [CreatePhoneDto] })
  Phones?: CreatePhoneDto[];

  @ApiProperty({ type: [CreateEmailDto] })
  Emails?: CreateEmailDto[];

  @ApiProperty({ type: [CreateRoleDto] })
  Roles?: CreateRoleDto[];
}
