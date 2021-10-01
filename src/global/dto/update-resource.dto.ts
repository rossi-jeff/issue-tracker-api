import { CreateResourceDto } from './create-resource.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateResourceDto extends CreateResourceDto {
  @ApiProperty()
  UUID: string;
}
