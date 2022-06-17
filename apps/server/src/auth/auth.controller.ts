import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  // @UseGuards(AuthGuard('jwt'))
  async login(@Body() body) {
    return this.authService.login(body);
  }
}
