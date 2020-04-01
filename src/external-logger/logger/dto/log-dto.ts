import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogDto {
  @ApiProperty()
  @IsNotEmpty()
  message: string;
}
