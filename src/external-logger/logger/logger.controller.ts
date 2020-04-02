import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AppLogger } from '../../logger/app-logger.service';
import { ErrorDto } from './dto/error-dto';
import { LogDto } from './dto/log-dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('logger')
@UseGuards(JwtAuthGuard)
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
