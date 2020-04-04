import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OauthStrategy } from './oauth2.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    ClientModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    AuthService,
    OauthStrategy,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [
    AuthService
  ]
})
export class AuthModule {}
