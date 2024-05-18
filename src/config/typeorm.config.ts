import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import './env';
import { Users } from '../entities/users.entity';
import { GlobalHelper } from '../helpers/global.helper';

const globalHelper = new GlobalHelper();

const config = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: `${globalHelper.convertToNumber(process.env.DB_PORT)}`,
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,
  entities: [Users],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  synchronize: false,
  logging: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
