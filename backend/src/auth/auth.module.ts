import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Club } from '../clubes/clubes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Club])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
