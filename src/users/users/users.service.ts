import { Injectable } from '@nestjs/common';
import { AppLogger } from '../../logger/app-logger.service';

@Injectable()
export class UsersService {
  constructor(
    private myLogger: AppLogger
  ) {
    this.myLogger.setContext('UsersService');
  }

  getUsers(): string[] {
    this.myLogger.warn('About to return all users!');
    return ['User 1', 'User 2'];
  }
}
