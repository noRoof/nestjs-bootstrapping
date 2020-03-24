import { Controller, Post, Body } from '@nestjs/common';
import { AppLogger } from '../../logger/app-logger.service';
import { ErrorDto } from './dto/error-dto';
import { LogDto } from './dto/log-dto';

@Controller('logger')
export class LoggerController {
  constructor(
    private myLogger: AppLogger
  ) {
   this.myLogger.setContext('LoggerController');
  }
  
  @Post('error')
  postError(@Body() errorLogDto: ErrorDto): void {
    return this.myLogger.error(errorLogDto.error, errorLogDto.trace);
  }

  @Post('warn')
  postWarning(@Body() logDto: LogDto): void {
    return this.myLogger.warn(logDto.message);
  }

  @Post('info')
  postInfo(@Body() logDto: LogDto): void {
    return this.myLogger.log(logDto.message);
  }
}
