import { Module } from '@nestjs/common';
import { ReferenteService } from './referente.service';
import { ReferenteController } from './referente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Referente } from './entities/referente.entity';
import { ClubesModule } from '../clubes/clubes.module'; // <-- IMPORTANTE

@Module({
  imports: [
    TypeOrmModule.forFeature([Referente]),
    ClubesModule, // <-- IMPORTANTE
  ],
  controllers: [ReferenteController],
  providers: [ReferenteService],
})
export class ReferenteModule {}