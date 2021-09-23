import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, ResponseLoginDto } from '../global/dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseLoginDto })
  @ApiResponse({ status: 401, description: 'Unathorized' })
  public async login(@Body() loginUserDto: LoginDto) {
    return await this.authService.login(loginUserDto);
  }

  @Delete(':UUID')
  @ApiResponse({ status: 204, description: 'No Content' })
  async logout(@Param('UUID') UUID: string, @Res() response: Response) {
    await this.authService.logout({ UUID });
    response.status(HttpStatus.NO_CONTENT).send();
  }
}
