import { IsOptional, IsNotEmpty } from 'class-validator';

export class ErrorDto {
  @IsNotEmpty()
  error: string;

  @IsOptional()
  trace: string;
}
