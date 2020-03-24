import { IsOptional, IsNotEmpty } from 'class-validator';

export class LogDto {
  @IsNotEmpty()
  message: string;
}
