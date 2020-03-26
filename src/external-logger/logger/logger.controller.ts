import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AppLogger } from '../../logger/app-logger.service';
import { ErrorDto } from './dto/error-dto';
import { LogDto } from './dto/log-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('logger')
export class LoggerController {
  constructor(
    private myLogger: AppLogger
  ) {
   this.myLogger.setContext('LoggerController');
  }

  @UseGuards(AuthGuard('oauth2-client-password'))
  @Post('error')
  postError(@Body() errorLogDto: ErrorDto): void {
    return this.myLogger.error(errorLogDto.error, errorLogDto.trace);
  }

  @UseGuards(AuthGuard('oauth2-client-password'))
  @Post('warn')
  postWarning(@Body() logDto: LogDto): void {
    return this.myLogger.warn(logDto.message);
  }

  @UseGuards(AuthGuard('oauth2-client-password'))
  @Post('info')
  postInfo(@Body() logDto: LogDto): void {
    return this.myLogger.log(logDto.message);
  }
}
