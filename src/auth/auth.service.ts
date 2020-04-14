import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users/users.service';
import { ClientService } from 'src/client/client.service';
import { UserDto } from 'src/users/users/dtos/user-dto';
import { ClientPayload } from './interfaces/client-payload';
import { UserPayload } from './interfaces/user-payload';

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

  async login(user: UserDto) {
    const payload: UserPayload = { email: user.email, userId: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async client(client: any) {
    const payload: ClientPayload = { clientId: client.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
