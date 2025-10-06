import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Club } from '../clubes/clubes.entity';

@Entity('usuarios') // nombre de la tabla en MySQL
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  correo: string;

  @Column()
  password: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  categoria: string;

  @Column()
  dni: string;

  @ManyToOne(() => Club, club => club.referentes)
  @JoinColumn({ name: 'club_id' })
  club: Club;
}
