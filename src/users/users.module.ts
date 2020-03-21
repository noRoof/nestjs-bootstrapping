import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
