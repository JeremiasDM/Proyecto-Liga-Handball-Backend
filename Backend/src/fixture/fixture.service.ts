import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFixtureDto } from './dto/create-fixture.dto';
import { UpdateFixtureDto } from './dto/update-fixture.dto';
import { Fixture } from './entities/fixture.entity';
import { Encuentro } from '../encuentro/entities/encuentro.entity'; // Import Encuentro

@Injectable()
export class FixtureService {
  constructor(
    @InjectRepository(Fixture)
    private readonly fixtureRepository: Repository<Fixture>,
    @InjectRepository(Encuentro) // Inyectar repositorio de Encuentro
    private readonly encuentroRepository: Repository<Encuentro>,
  ) {}

  async create(createFixtureDto: CreateFixtureDto): Promise<Fixture> {
    const { partidos, ...fixtureData } = createFixtureDto;

    // 1. Crear el Fixture principal
    const newFixture = this.fixtureRepository.create(fixtureData);
    const savedFixture = await this.fixtureRepository.save(newFixture);

    // 2. Crear los Encuentros asociados
    if (partidos && partidos.length > 0) {
      const encuentrosEntities = partidos.map(encuentroDto =>
        this.encuentroRepository.create({
          ...encuentroDto,
          fixtureId: savedFixture.id, // Asignar el ID del fixture creado
        }),
      );
      await this.encuentroRepository.save(encuentrosEntities);
    }

    // 3. Devolver el fixture completo con sus partidos cargados
    return this.findOne(savedFixture.id);
  }

  findAll(): Promise<Fixture[]> {
    return this.fixtureRepository.find({
      relations: ['partidos', 'partidos.club1', 'partidos.club2'], // Cargar partidos y sus clubes
      order: { fecha: 'DESC' } // Ordenar por fecha, más reciente primero
    });
  }

  async findOne(id: number): Promise<Fixture> {
    const fixture = await this.fixtureRepository.findOne({
      where: { id },
      relations: ['partidos', 'partidos.club1', 'partidos.club2'], // Cargar partidos y sus clubes
    });
    if (!fixture) {
      throw new NotFoundException(`Fixture con ID ${id} no encontrado.`);
    }
    return fixture;
  }

  async update(id: number, updateFixtureDto: UpdateFixtureDto): Promise<Fixture> {
     // La actualización de partidos anidados es más compleja.
     // Podrías borrar los existentes y crear los nuevos, o hacer un diff.
     // Por simplicidad, aquí solo actualizamos fecha y lugar.
     const { partidos, ...fixtureData } = updateFixtureDto;
     const fixture = await this.fixtureRepository.preload({ id, ...fixtureData });
     if (!fixture) {
         throw new NotFoundException(`Fixture con ID ${id} no encontrado.`);
     }
     // Aquí faltaría la lógica para actualizar/reemplazar los partidos (encuentros)
     await this.fixtureRepository.save(fixture);
     return this.findOne(id);
  }


  async remove(id: number) {
    // Gracias a onDelete: 'CASCADE' en Encuentro, borrar el fixture borrará sus partidos.
    const result = await this.fixtureRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Fixture con ID ${id} no encontrado.`);
    }
    return { deleted: true, id };
  }
}