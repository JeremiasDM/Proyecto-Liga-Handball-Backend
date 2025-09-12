import { Controller, Get } from '@nestjs/common';
import { LocalidadesService } from './localidades.service';
import { Localidad } from './localidad.entity';

@Controller('localidades')
export class LocalidadesController {
  constructor(private readonly localidadesService: LocalidadesService) {}

  @Get()
  async getAll(): Promise<Localidad[]> {
    return this.localidadesService.findAll();
  }
}
