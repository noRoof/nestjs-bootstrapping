import { Module } from '@nestjs/common';
import { LoggerController } from './logger/logger.controller';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [LoggerController],
})
export class ExternalLoggerModule {
}
