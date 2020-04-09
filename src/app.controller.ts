import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users/users.service';
import { ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from './users/users/dtos/user-register-dto';

@ApiTags('auth')
@Controller('auth')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService) {}

  @UseGuards(...[AuthGuard('oauth2-client-password'), AuthGuard('local')])
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('oauth2-client-password'))
  @Post('client')
  async client(@Request() req) {
    return this.authService.client(req.user);
  }

  @UseGuards(AuthGuard('oauth2-client-password'))
  @Post('register')
  async register(@Body() user: UserRegisterDto) {
    const registered = await this.usersService.register(user);
    return this.authService.login(registered);
  }
}
