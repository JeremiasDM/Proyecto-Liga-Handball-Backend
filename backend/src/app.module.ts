import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; // Controlador por defecto de NestJS
import { AppService } from './app.service';     // Servicio por defecto de NestJS
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Importa tus módulos de funcionalidades (features)
import { LocalidadesModule } from './localidades/localidades.module';
import { ClubesModule } from './clubes/clubes.module';
import { ReferenteModule } from './referente/referente.module';
import { JugadorModule } from './jugador/jugador.module';
import { EncuentroModule } from './encuentro/encuentro.module'; // Importar ANTES que Fixture si Fixture lo usa
import { FixtureModule } from './fixture/fixture.module';
//import { PagoModule } from './pago/pago.module';

@Module({
    imports: [
        // Config global (opcional si solo se usaba para DB)
        ConfigModule.forRoot({ isGlobal: true }),

        // 🔹 MySQL (conexión directa sin .env)
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'shinkansen.proxy.rlwy.net',
            port: 59556,
            username: 'root',
            password: 'CimVqFrWEhogJruXrlHYQPJWVgNpuiWa',
            database: 'railway',
            autoLoadEntities: true,
            // Sincroniza el esquema en desarrollo. Poner en 'false' para producción.
            synchronize: true,
        }),

        // Módulos de la aplicación (lista limpiada de duplicados)
        LocalidadesModule,
        ClubesModule,
        ReferenteModule,
        JugadorModule,
        EncuentroModule,  // Importante: antes que Fixture si FixtureModule importa EncuentroModule
        FixtureModule,
        //PagoModule,
    ],
})
export class AppModule { }