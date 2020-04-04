import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from 'src/logger/app-logger.service';
import { Client } from './models/client.entity';

@Injectable()
export class ClientService {
  constructor(
    private myLogger: AppLogger
  ) {
    this.myLogger.setContext('ClientService');
  }

  async findById(id): Promise<Client> {
    const client: Client = await Client.findOne({ id: id });
    if (!client) {
      throw new NotFoundException();
    }
    return client;
  }
}
