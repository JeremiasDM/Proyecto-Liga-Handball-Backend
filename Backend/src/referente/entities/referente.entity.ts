import { Club } from '../../clubes/entities/club.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Referente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  categoria: 'Masculino' | 'Femenino';

  @Column({ unique: true })
  dni: string;

  @Column({ unique: true })
  correo: string;

  // Clave foránea para la relación
  @Column()
  clubId: number;

  // Relación ManyToOne con Club
@ManyToOne(() => Club, (club) => club.referentes, {
    onDelete: 'CASCADE', // <-- CAMBIO: Borra el referente si se borra el club
  })
  @JoinColumn({ name: 'clubId' })
  club: Club;
}