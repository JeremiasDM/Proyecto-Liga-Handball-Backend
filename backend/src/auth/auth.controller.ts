import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from './create-usuario.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const success = await this.authService.validateUser(
      body.username,
      body.password,
    );

    if (success) {
      return { success: true };
    }
    return { success: false };
  }

  @Post('register')
  async register(@Body() dto: CreateUsuarioDto) {
    try {
      await this.authService.register(dto);
      return { success: true };
    } catch (err) {
      const message = err.response?.message || err.message || 'Error al registrar';
      return { success: false, message };
    }
  }
}
