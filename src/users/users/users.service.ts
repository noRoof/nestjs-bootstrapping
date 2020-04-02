import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppLogger } from '../../logger/app-logger.service';
import { User } from './models/user.entity';
import { UserDto } from './dtos/user-dto';
import { UserDataDto } from './dtos/user-data-dto';
import { UserRegisterDto } from './dtos/user-register-dto';

@Injectable()
export class UsersService {
  constructor(
    private myLogger: AppLogger
  ) {
    this.myLogger.setContext('UsersService');
  }

  async create(userData: UserDataDto): Promise<UserDto> {
    const user = new User();
    user.password = await this.hashPassword(userData.password);
    await this.updateDataAndSave(user, userData);
    return this.entityToDto(user);
  }

  async register(userData: UserRegisterDto): Promise<UserDto> {
    const user = new User();
    user.password = await this.hashPassword(userData.password);
    await this.updateDataAndSave(user, userData);
    return user;
  }

  async update(id: number, userData: UserDataDto): Promise<UserDto> {
    const user = await User.findOne(id);
    user.password = await this.hashPassword(userData.password);
    await this.updateDataAndSave(user, userData);
    return this.entityToDto(user);
  }

  async findById(id): Promise<UserDto> {
    const user: User = await User.findOne({ id: id });
    if (!user) {
      throw new NotFoundException();
    }
    return this.entityToDto(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await User.findOne({ email: email });
  }

  async findAll(): Promise<UserDto[]> {
    const users: User[] = await User.find();
    const cleanUsers: UserDto[] = users.map(user => {
      return this.entityToDto(user)
    });
    return cleanUsers;
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

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
