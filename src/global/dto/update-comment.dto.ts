import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends CreateCommentDto {
  @ApiProperty()
  UUID: string;
}
