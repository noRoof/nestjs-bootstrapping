import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../logger/app-logger.service';
import { User } from './models/user.entity';
import { UserDto } from './dtos/user-dto';
import { UserDataDto } from './dtos/user-data-dto';

@Injectable()
export class UsersService {
  constructor(
    private myLogger: AppLogger
  ) {
    this.myLogger.setContext('UsersService');
  }

  async create(beaconData: UserDataDto): Promise<UserDto> {
    const user = new User();
    await this.updateDataAndSave(user, beaconData);
    return this.entityToDto(user);
  }

  async update(id: number, beaconData: UserDataDto): Promise<UserDto> {
    const user = await User.findOne(id);
    await this.updateDataAndSave(user, beaconData);
    return this.entityToDto(user);
  }

  async findById(id): Promise<UserDto> {
    const user: UserDto = await User.findOne({ id: id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findAll(): Promise<UserDto[]> {
    const user: UserDto[] = await User.find();
    return user;
  }

  async delete(id) {
    this.myLogger.warn('About to delete a user!');
    const user = await User.findOne(id);
    await user.remove();
  }

  private async updateDataAndSave(user: User, data: UserDataDto) {
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.isActive = true;
    await user.save();
  }

  private entityToDto(user: User): UserDto {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
  }
}
