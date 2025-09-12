import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.usuariosRepository.findOne({ where: { username } });
    if (user && user.password === password) {
      return true;
    }
    return false;
  }
}
