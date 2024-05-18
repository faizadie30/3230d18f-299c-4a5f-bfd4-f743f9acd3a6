import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GlobalHelper } from '../helpers/global.helper';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { DetailUserDto } from './dto/detail-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    private readonly globalHelper: GlobalHelper,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<object> {
    const { email } = createUserDto;

    const checkAvailableUser = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.email = :email', {
        email,
      })
      .getExists();

    if (checkAvailableUser) {
      throw new ConflictException('User is exist!');
    }

    const user = new Users();
    user.first_name = createUserDto.first_name;
    user.last_name = createUserDto.last_name;
    user.email = email;
    user.phone = createUserDto.phone;
    user.position = createUserDto.position;

    await this.usersRepository.save(user);

    return {
      status: 'success',
      message: 'Success create user',
      data: user,
    };
  }

  async findAll(query: FindAllUserDto): Promise<object> {
    const { limit, page, orderBy } = query;
    const setLimiter: any = !limit ? 10 : limit;
    const setPage: any = !page ? 1 : page;

    const offset = (setPage - 1) * setLimiter;
    const customParam = '';

    const sql = this.usersRepository.createQueryBuilder('users');
    if (orderBy) {
      const orderSplit = orderBy.split(' ');
      const field = !orderSplit[0] ? 'id' : orderSplit[0];
      const position =
        !orderSplit[1] || orderSplit[1] === 'asc' ? 'ASC' : 'DESC';
      sql.orderBy(`users.${field}`, `${position}`);
    }

    const count = await sql.cache(60000).getCount();

    const getData = await sql
      .skip(offset)
      .take(setLimiter)
      .cache(60000)
      .getMany();

    const countPage = Math.ceil(count / setLimiter);

    const dataPaginate = this.globalHelper.generatePagination(
      'order/list-orders',
      setPage,
      setLimiter,
      countPage,
      count,
      customParam,
      orderBy,
    );

    return {
      status: 'success',
      data: getData,
      paginate: dataPaginate,
    };
  }

  async getDetail(query: DetailUserDto): Promise<object> {
    const { id, email } = query;

    const sql = this.usersRepository.createQueryBuilder('users');

    if (id) {
      sql.andWhere('users.id = :id', {
        id,
      });
    }

    if (email) {
      sql.andWhere('users.email = :email', {
        email,
      });
    }

    const count = await sql.cache(60000).getCount();

    const getData = await sql.limit(1).cache(60000).getOne();

    return {
      status: 'success',
      data: getData,
      count: count,
    };
  }

  async update(
    id: number | string,
    updateUserDto: UpdateUserDto,
  ): Promise<object> {
    console.log('id:', id);
    console.log('updateUserDto:', updateUserDto);
    const checkAvailableUser = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.id = :id', {
        id,
      })
      .getExists();

    if (!checkAvailableUser) {
      throw new NotFoundException('Not found user!');
    }

    const checkAvailableEmail = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.email = :email', {
        email: updateUserDto.email,
      })
      .getExists();

    if (checkAvailableEmail) {
      throw new ConflictException('Email is exist!');
    }

    await this.usersRepository
      .createQueryBuilder('users')
      .update(Users)
      .set(updateUserDto)
      .where('users.id = :id', { id })
      .execute();

    const getUser = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.id = :id', {
        id,
      })
      .getOne();

    return {
      status: 'success',
      message: 'Successfully updated',
      data: getUser,
    };
  }

  async delete(id: number | string): Promise<object> {
    const checkAvailableUser = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.id = :id', {
        id,
      })
      .getExists();

    if (!checkAvailableUser) {
      throw new NotFoundException('User not found!');
    }

    await this.usersRepository
      .createQueryBuilder('users')
      .delete()
      .from(Users)
      .where('id = :id', {
        id,
      })
      .execute();

    return {
      status: 'success',
      message: 'Delete user successfully',
    };
  }
}
