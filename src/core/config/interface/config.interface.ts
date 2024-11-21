import { SequelizeOptions } from 'sequelize-typescript';

export interface IConfig {
  port: number;
  db: SequelizeOptions;
  env: string;
}