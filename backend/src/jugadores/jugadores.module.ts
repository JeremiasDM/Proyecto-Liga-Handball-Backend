import { Module } from '@nestjs/common';
import { JugadoresService } from './jugadores.service';
import { JugadoresController } from './jugadores.controller';

@Module({
  providers: [JugadoresService],
  controllers: [JugadoresController]
})
export class JugadoresModule {}
