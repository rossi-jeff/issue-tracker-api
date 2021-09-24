import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePhoneDto, ResponsePhoneDto } from '../global/dto';
import { PhoneService } from './phone.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Phones')
@Controller('phone')
export class PhoneController {
  constructor(private phoneService: PhoneService) {}

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponsePhoneDto })
  async showPhone(@Param('UUID') UUID: string, @Res() response: Response) {
    response
      .status(HttpStatus.OK)
      .send(await this.phoneService.showPhone({ UUID }));
  }

  @Patch(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponsePhoneDto })
  async updatePhone(
    @Param('UUID') UUID: string,
    @Body() data: CreatePhoneDto,
    @Res() response: Response,
    @Req() req: any,
  ) {
    response
      .status(HttpStatus.OK)
      .send(this.phoneService.updatePhone({ UUID, ...data }));
  }

  @Delete(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'No Content' })
  async deletePhone(
    @Param('UUID') UUID: string,
    @Res() response: Response,
    @Req() req: any,
  ) {
    await this.phoneService.deletePhone({ UUID });
    response.status(HttpStatus.NO_CONTENT).send();
  }
}
