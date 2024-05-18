import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'oding',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'First Name must be string' })
  @Transform(({ value }) => value.toLowerCase())
  first_name: string;

  @ApiProperty({
    example: 'selamat sentosa',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Last Name must be string' })
  @Transform(({ value }) => value.toLowerCase())
  last_name: string;

  @ApiProperty({
    example: 'odingss@gmail.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Format Email Not Match' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({
    example: '(818) 555-2463',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Phone must be string' })
  phone: string;

  @ApiProperty({
    example: 'Backend Developer',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Position must be string' })
  position: string;
}
