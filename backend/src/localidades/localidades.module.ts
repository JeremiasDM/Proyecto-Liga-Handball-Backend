import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Localidad } from './localidad.entity';
import { LocalidadesService } from './localidades.service';
import { LocalidadesController } from './localidades.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Localidad])],
  providers: [LocalidadesService],
  controllers: [LocalidadesController],
})
export class LocalidadesModule {}
