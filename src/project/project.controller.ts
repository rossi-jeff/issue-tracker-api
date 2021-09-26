import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from '../global/dto/create-project.dto';
import { UpdateProjectDto } from '../global/dto/update-project.dto';
import { Response } from 'express';
import { ResponseProjectDto } from '../global/dto/response-project.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Projects')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'OK', type: [ResponseProjectDto] })
  async findAll(@Res() response: Response) {
    response.status(HttpStatus.OK).send(await this.projectService.findAll());
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'CREATED',
    type: ResponseProjectDto,
  })
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.CREATED)
      .send(await this.projectService.create(createProjectDto));
  }

  @Get(':UUID')
  @ApiResponse({ status: 200, description: 'OK', type: ResponseProjectDto })
  async findOne(@Param('UUID') UUID: string, @Res() response: Response) {
    response
      .status(HttpStatus.OK)
      .send(await this.projectService.findOne(UUID));
  }

  @Patch(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: ResponseProjectDto })
  async update(
    @Param('UUID') UUID: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.OK)
      .send(await this.projectService.update(UUID, updateProjectDto));
  }

  @Delete(':UUID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'No Content' })
  async remove(@Param('UUID') UUID: string, @Res() response: Response) {
    await this.projectService.remove(UUID);
    response.status(HttpStatus.NO_CONTENT).send();
  }
}
