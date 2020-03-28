import { IsNotEmpty } from 'class-validator';

export class LogDto {
  @IsNotEmpty()
  message: string;
}
