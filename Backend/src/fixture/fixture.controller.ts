import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { CreateFixtureDto } from './dto/create-fixture.dto';
import { UpdateFixtureDto } from './dto/update-fixture.dto';

@Controller('fixtures')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

  @Post()
  create(@Body() createFixtureDto: CreateFixtureDto) {
    return this.fixtureService.create(createFixtureDto);
  }

  @Get()
  findAll() {
    return this.fixtureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fixtureService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFixtureDto: UpdateFixtureDto,
  ) {
    // Recuerda que la lógica de actualizar partidos anidados está pendiente en el servicio
    return this.fixtureService.update(id, updateFixtureDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fixtureService.remove(id);
  }
}