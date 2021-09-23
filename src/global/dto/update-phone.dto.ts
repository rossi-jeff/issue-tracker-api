import { ApiProperty } from '@nestjs/swagger';
import { CreatePhoneDto } from './create-phone.dto';

export class UpdatePhoneDto extends CreatePhoneDto {
  @ApiProperty()
  UUID: string;
}
