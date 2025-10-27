import { Club } from '../../clubes/entities/club.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Pago {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string; // 'cuota', 'arbitraje', 'multa', 'otro'

  @Column()
  clubId: number; // Clave foránea

  @ManyToOne(() => Club, { onDelete: 'SET NULL' }) // O CASCADE si prefieres
  @JoinColumn({ name: 'clubId' })
  club: Club;

  @Column('decimal', { precision: 10, scale: 2 }) // Para dinero
  monto: number;

  @Column({ nullable: true })
  comprobante: string; // Número o código

  @Column({ type: 'mediumtext', nullable: true }) // Para Base64
  comprobanteArchivo: string;

  @CreateDateColumn() // Genera la fecha automáticamente
  fecha: Date;

  @Column({ default: 'pendiente' }) // pendiente, pagado, validado, invalido
  estado: string;

  // --- Campos opcionales según el tipo ---
  @Column({ nullable: true })
  categoria: string; // 'Masculino', 'Femenino', 'Ambos' (para cuota/arbitraje)

  @Column({ nullable: true })
  partidoId: number; // ID del Encuentro (para arbitraje)
  // Aquí podrías añadir @ManyToOne con Encuentro si lo necesitas

  @Column({ nullable: true })
  cantidadJugadores: number; // (para cuota)

  @Column({ nullable: true })
  motivo: string; // (para multa u otro)
}