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
import { CreateRoleDto, ResponseRoleDto } from '../global/dto';
import { RoleService } from './role.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseRoleDto })
  async showRole(@Param('UUID') UUID: string, @Res() response: Response) {
    response
      .status(HttpStatus.OK)
      .send(await this.roleService.showRole({ UUID }));
  }

  @Patch(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseRoleDto })
  async updateRole(
    @Param('UUID') UUID: string,
    @Body() data: Partial<CreateRoleDto>,
    @Res() response: Response,
    @Req() req: any,
  ) {
    response
      .status(HttpStatus.OK)
      .send(this.roleService.updateRole({ UUID, ...data }));
  }

  @Delete(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'No Content' })
  async deleteRole(
    @Param('UUID') UUID: string,
    @Res() response: Response,
    @Req() req: any,
  ) {
    await this.roleService.deleteRole({ UUID });
    response.status(HttpStatus.NO_CONTENT).send();
  }
}
