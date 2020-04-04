import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ExternalLoggerModule } from './external-logger/external-logger.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users/models/user.entity';
import { ClientModule } from './client/client.module';
import { Client } from './client/models/client.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE_NAME,
      entities: [
        User,
        Client
      ],
      synchronize: true,
    }),
    UsersModule,
    ExternalLoggerModule,
    AuthModule,
    ClientModule],
})
export class AppModule {}
