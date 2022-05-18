import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  CreateTimeclockDto,
  FilterTimeclockDto,
  ResponseTimeclockDto,
  DeletedCountDto,
} from '../global/dto';
import { TimeclockService } from './timeclock.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Time Clocks')
@Controller('timeclock')
export class TimeclockController {
  constructor(private timeclockService: TimeclockService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'OK', type: [ResponseTimeclockDto] })
  async getTimeclocks(
    @Res() response: Response,
    @Query() filter?: FilterTimeclockDto,
  ) {
    response
      .status(HttpStatus.OK)
      .send(await this.timeclockService.getTimeclocks(filter));
  }

  @Get('deleted')
  @ApiResponse({ status: 200, description: 'OK', type: DeletedCountDto })
  async countDeleted(@Res() response: Response) {
    let count = await this.timeclockService.countDeleted();
    response.status(HttpStatus.OK).send({ count });
  }

  @Post('reset')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: [ResponseTimeclockDto] })
  async resetDeleted(@Res() response: Response) {
    response
      .status(HttpStatus.OK)
      .send(await this.timeclockService.resetDeleted());
  }

  @Post('current')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'No Content' })
  async currentDates(@Res() response: Response) {
    await this.timeclockService.currentDates();
    response.status(HttpStatus.NO_CONTENT).send();
  }

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseTimeclockDto })
  async showTimeclock(@Param('UUID') UUID: string, @Res() response: Response) {
    response
      .status(HttpStatus.OK)
      .send(await this.timeclockService.showTimeclock({ UUID }));
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'CREATED',
    type: ResponseTimeclockDto,
  })
  async createTimeclock(
    @Body() data: CreateTimeclockDto,
    @Res() response: Response,
    @Req() req: any,
  ) {
    if (!data.UserId) data.UserId = req.user.Id;
    response
      .status(HttpStatus.OK)
      .send(await this.timeclockService.createTimeclock(data));
  }

  @Patch(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseTimeclockDto })
  async updateTimeclock(
    @Param('UUID') UUID: string,
    @Body() data: CreateTimeclockDto,
    @Res() response: Response,
    @Req() req: any,
  ) {
    response
      .status(HttpStatus.OK)
      .send(await this.timeclockService.updateTimeclock({ UUID, ...data }));
  }

  @Delete(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'No Content' })
  async deleteTimeclock(
    @Param('UUID') UUID: string,
    @Res() response: Response,
    @Req() req: any,
  ) {
    await this.timeclockService.deleteTimeclock({ UUID });
    response.status(HttpStatus.NO_CONTENT).send();
  }
}
