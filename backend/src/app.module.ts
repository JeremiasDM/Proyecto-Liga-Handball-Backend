import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { JugadoresModule } from './jugadores/jugadores.module';
import { ClubesModule } from './clubes/clubes.module';
import { AuthModule } from './auth/auth.module';
import { LocalidadesModule } from './localidades/localidades.module';

@Module({
  imports: [
    // 🔹 MongoDB Atlas (para imágenes)
    MongooseModule.forRoot(
      'mongodb+srv://jeremiasmaldonadoescuela:04FrXznuoCTiy5hO@ligahandballpunilla.hh3hiuy.mongodb.net/?retryWrites=true&w=majority&appName=LigaHandballPunilla',
    ),

    // 🔹 MySQL (para datos relacionales)
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',   // o la IP del server MySQL
      port: 3306,
      username: 'root',
      password: '',
      database: 'ligahandball',
      autoLoadEntities: true, // carga entidades automáticamente
      synchronize: true,      // crea/actualiza tablas a partir de entidades (solo en dev)
    }),

    JugadoresModule,
    ClubesModule,
    AuthModule,
    LocalidadesModule,
    ClubesModule,
  ],
})
export class AppModule {}