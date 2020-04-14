import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user-dto';
import { UserDataDto } from './dtos/user-data-dto';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './user.decorator';
import { UserPayload } from 'src/auth/interfaces/user-payload';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from './models/user-role';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(...[JwtAuthGuard, RolesGuard])
@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @Get('me')
  @ApiResponse({ description: 'User data.' })
  @ApiUnauthorizedResponse({ description: 'Invalid jwt or access expired.' })
  getProfile(@User() user: UserPayload) {
    return this.usersService.findById(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserDto> {
    return this.usersService.findById(id);
  }

  @Post()
  create(@Body() user: UserDataDto): Promise<UserDto> {
    return this.usersService.create(user);
  }

  @Roles(UserRole.EDITOR, UserRole.ADMIN)
  @Put(':id')
  update(@Param('id') id: number, @Body() user: UserDataDto): Promise<UserDto> {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: number) {
    return this.remove(id);
  }
}
