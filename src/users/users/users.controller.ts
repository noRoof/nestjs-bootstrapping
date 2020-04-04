import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user-dto';
import { UserDataDto } from './dtos/user-data-dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserDto> {
    return this.usersService.findById(id);
  }

  @Post()
  create(@Body() user: UserDataDto): Promise<UserDto> {
    return this.usersService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: UserDataDto): Promise<UserDto> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.remove(id);
  }
}
