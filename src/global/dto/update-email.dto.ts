import { ApiProperty } from '@nestjs/swagger';
import { CreateEmailDto } from './create-email.dto';

export class UpdateEmailDto extends CreateEmailDto {
  @ApiProperty()
  UUID: string;
}
