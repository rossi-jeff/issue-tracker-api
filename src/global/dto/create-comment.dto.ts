import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  Title?: string;

  @ApiProperty()
  Details?: string;

  @ApiProperty()
  AuthorId?: number;

  @ApiProperty()
  IssueId?: number;
}
