import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindAllUserDto {
  @ApiProperty({
    example: 'first_name asc',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'order by must be string' })
  orderBy: string;

  @ApiProperty({
    example: 1,
    required: false,
    type: 'number',
  })
  @IsOptional()
  page: string;

  @ApiProperty({
    example: 10,
    required: false,
    type: 'number',
  })
  @IsOptional()
  limit: string;
}
