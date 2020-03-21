import { Injectable } from '@nestjs/common';
import { AppLogger } from './logger/app-logger.service';

@Injectable()
export class AppService {
  constructor(
    // private myLogger: AppLogger
    ) {
    // this.myLogger.setContext('AppService');
  }

  getHello(): string {
    // this.myLogger.warn('About to return Hello World!');
    // this.myLogger.log('About info Hello World!');
    return 'Hello World!';
  }
}
