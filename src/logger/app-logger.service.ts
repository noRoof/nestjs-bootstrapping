import { Logger, Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends Logger {
  logger: winston.Logger;

  constructor() {
    super();
    this.logger = winston.createLogger({
      level: 'debug',
      transports: [
        new DailyRotateFile({
          filename: 'app-%DATE%.log',
          level: 'warn',
          format: winston.format.json(),
          datePattern: 'YYYY-MM-DD-HH',
          maxSize: '10m',
          maxFiles: '7d',
          dirname: 'logs',
        }),
      ],
    });
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace)
    super.error(message, trace);
  }

  log(message: string) {
    this.logger.info(message);
    super.log(message);
  }

  warn(message: string) {
    this.logger.warn(message);
    super.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
    super.debug(message);
  }
}