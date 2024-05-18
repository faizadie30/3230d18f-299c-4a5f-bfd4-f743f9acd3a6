import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DetailUserDto {
  @ApiProperty({
    example: 1,
    required: false,
    type: 'integer',
  })
  @IsOptional()
  id: string | number;

  @ApiProperty({
    example: 'oding@gmail.com',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'email by must be string' })
  email: string;
}
