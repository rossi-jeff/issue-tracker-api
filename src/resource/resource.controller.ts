import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  HttpStatus,
  Res,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ResponseResourceDto, CreateResourceDto } from '../global/dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Resources')
@Controller('resource')
export class ResourceController {
  constructor(private resourceService: ResourceService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'OK', type: [ResponseResourceDto] })
  async getResources(@Res() response: Response) {
    response
      .status(HttpStatus.OK)
      .send(await this.resourceService.getResources());
  }

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseResourceDto })
  async showResource(@Param('UUID') UUID: string, @Res() response: Response) {
    response
      .status(HttpStatus.OK)
      .send(await this.resourceService.showResource({ UUID }));
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'CREATED',
    type: ResponseResourceDto,
  })
  async createResource(
    @Body() createResourceDto: CreateResourceDto,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.CREATED)
      .send(await this.resourceService.createResource(createResourceDto));
  }

  @Patch(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseResourceDto })
  async updateResource(
    @Param('UUID') UUID: string,
    @Body() createResourceDto: CreateResourceDto,
    @Res() response: Response,
  ) {
    response.status(HttpStatus.OK).send(
      await this.resourceService.updateResource({
        UUID,
        ...createResourceDto,
      }),
    );
  }

  @Delete(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'No Content' })
  async deleteResource(@Param('UUID') UUID: string, @Res() response: Response) {
    await this.resourceService.deleteResource({ UUID });
    response.status(HttpStatus.NO_CONTENT).send();
  }
}
