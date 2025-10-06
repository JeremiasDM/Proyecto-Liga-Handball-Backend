import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Usuario } from '../usuarios/usuario.entity';

@Entity("clubes")
export class Club {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  categoria: "masculino" | "femenino";

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @Column()
  localidad: string;

  @Column()
  fechaRegistro: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(() => Usuario, usuario => usuario.club)
  referentes: Usuario[];
}
