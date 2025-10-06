import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Club } from '../clubes/clubes.entity';
import * as crypto from 'crypto';
import nodemailer from 'nodemailer'; // Import nodemailer for email notifications
import { CreateUsuarioDto } from './create-usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
  ) {}

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.usuariosRepository.findOneBy({ correo: username });
    if (user && user.password === password) {
      return true;
    }
    return false;
  }

  async register(dto: CreateUsuarioDto): Promise<{ success: boolean }> {
    // Generate random password (8 hex characters)
    const password = crypto.randomBytes(4).toString('hex');
    // Find club by ID
    const club = await this.clubRepository.findOneBy({ id: dto.equipoId });
    if (!club) {
      throw new BadRequestException('Club no encontrado');
    }
    // Create and save new user with relation
    const { equipoId, ...rest } = dto;
    const usuario = this.usuariosRepository.create({ ...rest, password, club });
    await this.usuariosRepository.save(usuario);
    // Send email notification with credentials (non-blocking)
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: dto.correo,
        subject: 'Bienvenido como Referente',
        text: `Hola ${dto.nombre},

Tu cuenta ha sido creada en la plataforma.
Usuario: ${dto.correo}
Contraseña: ${password}

Saludos!`,
      });
    } catch (emailErr) {
      console.error('Error sending registration email:', emailErr);
      // Proceed without failing registration
    }
    return { success: true };
  }
}
