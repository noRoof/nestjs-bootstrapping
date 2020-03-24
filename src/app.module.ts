import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExternalLoggerModule } from './external-logger/external-logger.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, ExternalLoggerModule],
})
export class AppModule {}
