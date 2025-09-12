import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios') // nombre de la tabla en MySQL
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
