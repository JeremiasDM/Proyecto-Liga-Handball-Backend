import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Localidad } from './localidad.entity';

@Injectable()
export class LocalidadesService {
  constructor(
    @InjectRepository(Localidad)
    private readonly localidadRepo: Repository<Localidad>,
  ) {}

  async findAll(): Promise<Localidad[]> {
    return this.localidadRepo.find();
  }
}
