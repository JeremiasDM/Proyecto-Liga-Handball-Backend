import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

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
}
