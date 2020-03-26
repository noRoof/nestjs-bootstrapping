import { Strategy } from 'passport-oauth2-client-password';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class OauthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(clientId: string, clientSecret:string): Promise<any> {
    const client = await this.authService.validateClient(clientId, clientSecret);
    if (!client) {
      throw new UnauthorizedException();
    }
    return client;
  }
}