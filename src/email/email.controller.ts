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
import { CreateEmailDto, ResponseEmailDto } from '../global/dto';
import { EmailService } from './email.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Emails')
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseEmailDto })
  async showEmail(@Param('UUID') UUID: string, @Res() response: Response) {
    response
      .status(HttpStatus.OK)
      .send(await this.emailService.showEmail({ UUID }));
  }

  @Patch(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseEmailDto })
  async updateEmail(
    @Param('UUID') UUID: string,
    @Body() data: CreateEmailDto,
    @Res() response: Response,
    @Req() req: any,
  ) {
    response
      .status(HttpStatus.OK)
      .send(this.emailService.updateEmail({ UUID, ...data }));
  }

  @Delete(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'No Content' })
  async deleteEmail(
    @Param('UUID') UUID: string,
    @Res() response: Response,
    @Req() req: any,
  ) {
    await this.emailService.deleteEmail({ UUID });
    response.status(HttpStatus.NO_CONTENT).send();
  }
}
