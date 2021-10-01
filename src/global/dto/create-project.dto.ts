import { ApiProperty } from '@nestjs/swagger';
import { SequenceEmbedDto } from './sequence-embed.dto';

export class CreateProjectDto {
  @ApiProperty()
  Name: string;

  @ApiProperty()
  Details: string;

  @ApiProperty()
  Sequence: SequenceEmbedDto;
}
