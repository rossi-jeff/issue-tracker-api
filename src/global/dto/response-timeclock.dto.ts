import { ApiProperty } from "@nestjs/swagger";
import { ResponseIssueDto, ResponseUserDto } from ".";
import { CreateTimeclockDto } from "./create-timeclock.dto";
import { ResponseProjectDto } from "./response-project.dto";

export class ResponseTimeclockDto extends CreateTimeclockDto {
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

  @ApiProperty({ type: () => ResponseUserDto })
  User?: ResponseUserDto;

  @ApiProperty({ type: () => ResponseIssueDto })
  Issue?: ResponseIssueDto;

  @ApiProperty({ type: () => ResponseProjectDto })
  Project?: ResponseProjectDto;
}