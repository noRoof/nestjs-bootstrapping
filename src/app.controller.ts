import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users/users.service';
import { ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from './users/users/dtos/user-register-dto';

@ApiTags('auth')
@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService) {}

  @UseGuards(...[AuthGuard('oauth2-client-password'), AuthGuard('local')])
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('oauth2-client-password'))
  @Post('auth/client')
  async client(@Request() req) {
    return this.authService.client(req.user);
  }

  @UseGuards(AuthGuard('oauth2-client-password'))
  @Post('auth/register')
  async register(@Body() user: UserRegisterDto) {
    const registered = await this.usersService.register(user);
    const toLogin = {
      username: registered.email,
      sub: registered.id
    }
    return this.authService.login(toLogin);
  }
}
