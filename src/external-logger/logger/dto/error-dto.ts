import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty()
  @IsNotEmpty()
  error: string;

  @ApiProperty()
  @IsOptional()
  trace: string;
}
