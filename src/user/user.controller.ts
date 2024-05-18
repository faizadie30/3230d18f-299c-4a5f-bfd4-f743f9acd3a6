import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { UserService } from './user.service';
import { DetailUserDto } from './dto/detail-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() createUserDto: CreateUserDto): Promise<object> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  @HttpCode(200)
  async findAll(@Query() query: FindAllUserDto): Promise<object> {
    return await this.userService.findAll(query);
  }

  @Get('/detail')
  @HttpCode(200)
  async getDetail(@Query() query: DetailUserDto): Promise<object> {
    return await this.userService.getDetail(query);
  }

  @Put(':id')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    example: 1,
    required: true,
    description:
      'The id of the user to update specific user, support Int and String',
    type: 'string' || 'integer',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async update(
    @Param('id') id: number | string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<object> {
    console.log('id:', id);
    console.log('updateUserDto:', updateUserDto);
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiParam({
    name: 'id',
    example: 1,
    required: true,
    description: 'The id of the user to delete, support Int and String',
    type: 'string' || 'integer',
    schema: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
  })
  async delete(@Param('id') id: number | string): Promise<object> {
    return await this.userService.delete(id);
  }
}
