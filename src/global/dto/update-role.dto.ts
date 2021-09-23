import { ApiProperty } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends CreateRoleDto {
  @ApiProperty()
  UUID: string;
}
