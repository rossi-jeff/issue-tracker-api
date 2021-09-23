import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterService } from './register.service';
import { Response } from 'express';
import { CreateUserDto, ResponseUserDto } from '../global/dto';

@ApiTags('Register')
@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseUserDto })
  @ApiResponse({
    status: 500,
    description: 'The most common error is that a username exists',
  })
  async registerUser(@Body() data: CreateUserDto, @Res() response: Response) {
    response
      .status(HttpStatus.CREATED)
      .send(await this.registerService.registerUser(data));
  }
}
