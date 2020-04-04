import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users/users.service';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private clientService: ClientService,
    private jwtService: JwtService
    ) {}

  async validateClient(clientId: string, clientSecret: string): Promise<any> {
    const client = await this.clientService.findById(clientId);
    if (client && client.secret === clientSecret) {
      const { secret, ...result } = client;
      return result;
    }
    return null;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    const match = await bcrypt.compare(pass, user.password);
    if (match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async client(client: any) {
    const payload = { clientId: client.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
