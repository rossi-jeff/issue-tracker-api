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
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Response } from 'express';
import {
  CreateEmailDto,
  CreatePhoneDto,
  CreateRoleDto,
  CreateUserDto,
  FilterUserDto,
  ResponseEmailDto,
  ResponsePhoneDto,
  ResponseUserDto,
  ChangePasswordDto,
  ResponseTimeclockDto,
} from '../global/dto';
import { AuthGuard } from '@nestjs/passport';

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
  async getUsers(@Res() response: Response, @Query() filter?: FilterUserDto) {
    console.log(filter);
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
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Created', type: ResponseUserDto })
  async createUser(
    @Body() data: CreateUserDto,
    @Res() response: Response,
    @Req() req: any,
  ) {
    response
      .status(HttpStatus.CREATED)
      .send(await this.userService.createUser(data));
  }

  @Patch(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseUserDto })
  async updateUser(
    @Param('UUID') UUID: string,
    @Body() data: CreateUserDto,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.OK)
      .send(await this.userService.updateUser({ UUID, ...data }));
  }

  @Delete(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'No Content' })
  async deleteUser(@Param('UUID') UUID: string, @Res() response: Response) {
    await this.userService.deleteUser({ UUID });
    response.status(HttpStatus.NO_CONTENT).send();
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post(':UUID/email')
  @ApiResponse({ status: 201, description: 'Created', type: ResponseEmailDto })
  async addEmail(
    @Param('UUID') UUID: string,
    @Body() data: CreateEmailDto,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.CREATED)
      .send(await this.userService.addEmail(UUID, data));
  }

  @Post(':UUID/phone')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Created', type: ResponsePhoneDto })
  async addPhone(
    @Param('UUID') UUID: string,
    @Body() data: CreatePhoneDto,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.CREATED)
      .send(await this.userService.addPhone(UUID, data));
  }

  @Post(':UUID/role')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Created', type: ResponsePhoneDto })
  async addRole(
    @Param('UUID') UUID: string,
    @Body() data: CreateRoleDto,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.CREATED)
      .send(await this.userService.addRole(UUID, data));
  }

  @Post(':UUID/password')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 401, description: 'Unathorized' })
  async changePassword(
    @Param('UUID') UUID: string,
    @Body() changeDto: ChangePasswordDto,
    @Res() response: Response,
  ) {
    const user = await this.userService.changePassword(UUID, changeDto);
    if (user) {
      response.status(HttpStatus.NO_CONTENT).send();
    } else {
      response.status(HttpStatus.UNAUTHORIZED).send();
    }
  }

  @Get(':UUID/timeclock')
  @ApiResponse({ status: 200, description: 'OK', type: [ResponseTimeclockDto] })
  async getTimeClocks(@Param('UUID') UUID: string, @Res() response: Response) {
    response
      .status(HttpStatus.OK)
      .send(await this.userService.getTimeClocks(UUID));
  }
}
