import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { LocalidadesModule } from './localidades/localidades.module';
import { ClubesModule } from './clubes/clubes.module';
import { ReferenteModule } from './referente/referente.module';
import { JugadorModule } from './jugador/jugador.module';
import { EncuentroModule } from './encuentro/encuentro.module';
import { FixtureModule } from './fixture/fixture.module';

@Module({
  imports: [
    // Configuración global
    ConfigModule.forRoot({ isGlobal: true }),

    // Conexión a MySQL usando variable de entorno DATABASE_URL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // false en producción
      }),
    }),

    // Módulos de la aplicación
    LocalidadesModule,
    ClubesModule,
    ReferenteModule,
    JugadorModule,
    EncuentroModule,
    FixtureModule,
  ],
})
export class AppModule {}
