import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EncuentroService } from './encuentro.service';

@Controller('encuentros') // Opcional, podrías manejar todo desde /fixtures/:id/partidos
export class EncuentroController {
  constructor(private readonly encuentroService: EncuentroService) {}

  // Podrías tener endpoints para actualizar un resultado específico, etc.
  @Get('fixture/:fixtureId')
  findAllByFixture(@Param('fixtureId', ParseIntPipe) fixtureId: number) {
      return this.encuentroService.findAllByFixture(fixtureId);
  }
}