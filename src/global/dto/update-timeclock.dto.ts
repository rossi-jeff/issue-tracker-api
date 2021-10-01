import { ApiProperty } from "@nestjs/swagger";
import { CreateTimeclockDto } from "./create-timeclock.dto"

export class UpdateTimeclockDto extends CreateTimeclockDto {
  @ApiProperty()
  UUID: string;
}