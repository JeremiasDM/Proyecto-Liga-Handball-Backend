import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReferenteDto } from './dto/create-referente.dto';
import { UpdateReferenteDto } from './dto/update-referente.dto';
import { Referente } from './entities/referente.entity';

@Injectable()
export class ReferenteService {
  constructor(
    @InjectRepository(Referente)
    private readonly referenteRepository: Repository<Referente>,
  ) {}

  async create(createReferenteDto: CreateReferenteDto): Promise<Referente> {
    const newReferente = this.referenteRepository.create(createReferenteDto);
    const saved = await this.referenteRepository.save(newReferente);
    // Volvemos a buscar para incluir la relación 'club' en la respuesta
    return this.findOne(saved.id);
  }

  findAll(): Promise<Referente[]> {
    // Usamos 'relations' para que la consulta traiga los datos del club
    return this.referenteRepository.find({
      relations: ['club'],
    });
  }

  async findOne(id: number): Promise<Referente> {
    const referente = await this.referenteRepository.findOne({
      where: { id },
      relations: ['club'],
    });
    if (!referente) {
      throw new NotFoundException(`Referente con ID ${id} no encontrado.`);
    }
    return referente;
  }

  async update(
    id: number,
    updateReferenteDto: UpdateReferenteDto,
  ): Promise<Referente> {
    const referente = await this.referenteRepository.preload({
      id,
      ...updateReferenteDto,
    });
    if (!referente) {
      throw new NotFoundException(`Referente con ID ${id} no encontrado.`);
    }
    const saved = await this.referenteRepository.save(referente);
    // Volvemos a buscar para incluir la relación 'club' en la respuesta
    return this.findOne(saved.id);
  }

  async remove(id: number) {
    const result = await this.referenteRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Referente con ID ${id} no encontrado.`);
    }
    return { deleted: true, id };
  }
}