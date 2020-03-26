import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateClient(clientId: string, clientSecret: string): Promise<any> {
    const client = await this.findClient(clientId);
    if (client && client.secret === clientSecret) {
      const { secret, ...result } = client;
      return result;
    }
    return null;
  }

  findClient(clintId: string) {
    return {
      secret: 'dummy secret',
      id: clintId
    }
  }
}
