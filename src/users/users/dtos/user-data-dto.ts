import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class UserDataDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  
  @IsNotEmpty()
  @IsString()
  lastName: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
