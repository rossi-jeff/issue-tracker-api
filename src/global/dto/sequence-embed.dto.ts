import { ApiProperty } from '@nestjs/swagger';

export class SequenceEmbedDto {
  @ApiProperty()
  Prefix?: string;

  @ApiProperty()
  Max?: number;
}
