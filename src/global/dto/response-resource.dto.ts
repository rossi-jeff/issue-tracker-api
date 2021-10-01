import { CreateResourceDto } from './create-resource.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseResourceDto extends CreateResourceDto {
  @ApiProperty()
  Id: number;

  @ApiProperty()
  UUID: string;

  @ApiProperty()
  Created: string;

  @ApiProperty()
  Updated: string;

  @ApiProperty()
  Version: number;

  @ApiProperty()
  IsDeleted?: boolean;
}
