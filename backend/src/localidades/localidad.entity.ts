import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('localidades')
export class Localidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
