import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'oding',
    required: true,
  })
  @IsNotEmpty({ message: 'First Name is required' })
  @IsString({ message: 'First Name must be string' })
  @Transform(({ value }) => value.toLowerCase())
  first_name: string;

  @ApiProperty({
    example: 'selamat sentosa',
    required: true,
  })
  @IsNotEmpty({ message: 'Last Name is required' })
  @IsString({ message: 'Last Name must be string' })
  @Transform(({ value }) => value.toLowerCase())
  last_name: string;

  @ApiProperty({
    example: 'odingss@gmail.com',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Format Email Not Match' })
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({
    example: '(818) 555-2463',
    required: true,
  })
  @IsNotEmpty({ message: 'Phone is required' })
  @IsString({ message: 'Phone must be string' })
  phone: string;

  @ApiProperty({
    example: 'Backend Developer',
    required: true,
  })
  @IsNotEmpty({ message: 'Position is required' })
  @IsString({ message: 'Position must be string' })
  position: string;
}
