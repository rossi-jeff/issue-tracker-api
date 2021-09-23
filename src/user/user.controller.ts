import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Response } from 'express';
import {
  CreateEmailDto,
  CreatePhoneDto,
  CreateRoleDto,
  CreateUserDto,
  ResponseEmailDto,
  ResponsePhoneDto,
  ResponseUserDto,
} from '../global/dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: [ResponseUserDto],
  })
  async getUsers(@Res() response: Response) {
    response.status(HttpStatus.OK).send(await this.userService.getUsers());
  }

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseUserDto })
  async showUserUuid(@Param('UUID') UUID: string, @Res() response: Response) {
    response
      .status(HttpStatus.OK)
      .send(await this.userService.showUserUuid({ UUID }));
  }

  // will be handled by register controller
  @Post()
  @ApiResponse({ status: 201, description: 'Created', type: ResponseUserDto })
  async createUser(@Body() data: CreateUserDto, @Res() response: Response) {
    response
      .status(HttpStatus.CREATED)
      .send(await this.userService.createUser(data));
  }

  @Patch(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseUserDto })
  async updateUser(
    @Param('UUID') UUID: string,
    @Body() data: Partial<CreateUserDto>,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.OK)
      .send(this.userService.updateUser({ UUID, ...data }));
  }

  @Delete(':UUID')
  @ApiResponse({ status: 204, description: 'No Content' })
  async deleteUser(@Param('UUID') UUID: string, @Res() response: Response) {
    await this.userService.deleteUser({ UUID });
    response.status(HttpStatus.NO_CONTENT).send();
  }

  @Post(':UUID/email')
  @ApiResponse({ status: 201, description: 'Created', type: ResponseEmailDto })
  async addEmail(
    @Param('UUID') UUID: string,
    @Body() data: Partial<CreateEmailDto>,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.CREATED)
      .send(await this.userService.addEmail(UUID, data));
  }

  @Post(':UUID/phone')
  @ApiResponse({ status: 201, description: 'Created', type: ResponsePhoneDto })
  async addPhone(
    @Param('UUID') UUID: string,
    @Body() data: Partial<CreatePhoneDto>,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.CREATED)
      .send(await this.userService.addPhone(UUID, data));
  }

  @Post(':UUID/role')
  @ApiResponse({ status: 201, description: 'Created', type: ResponsePhoneDto })
  async addRole(
    @Param('UUID') UUID: string,
    @Body() data: Partial<CreateRoleDto>,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.CREATED)
      .send(await this.userService.addRole(UUID, data));
  }
}
