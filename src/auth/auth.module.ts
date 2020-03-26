import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { OauthStrategy } from './oauth2.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, OauthStrategy]
})
export class AuthModule {}
