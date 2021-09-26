import { ApiProperty } from '@nestjs/swagger';
import {
  ComplexityArray,
  IssueTypeArray,
  PriorityArray,
  StatusArray,
} from '../array';

export class CreateIssueDto {
  @ApiProperty()
  Title?: string;

  @ApiProperty()
  Details?: string;

  @ApiProperty({ enum: IssueTypeArray })
  Type?: string;

  @ApiProperty({ enum: StatusArray })
  Status?: string;

  @ApiProperty({ enum: PriorityArray })
  Priority?: string;

  @ApiProperty({ enum: ComplexityArray })
  Complexity?: string;

  @ApiProperty()
  AuthorId?: number;

  @ApiProperty()
  AssignedToId?: number;

  @ApiProperty()
  ProjectId?: number;
}
