import { ApiProperty } from "@nestjs/swagger";
import { ClockDto } from "./clock.dto";

export class CreateTimeclockDto {
  @ApiProperty()
  Start?: ClockDto;

  @ApiProperty()
  End?: ClockDto;

  @ApiProperty()
  UserId?: number;

  @ApiProperty()
  ProjectId?: number;

  @ApiProperty()
  IssueId?: number;
}