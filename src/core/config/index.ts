
import { Dialect } from 'sequelize';
import { IConfig } from './interface/config.interface';

export function config(): IConfig {
  const env = process.env.NODE_ENV;
  
  function getName() {
    const name = process.env.DB_NAME;
    switch (process.env.NODE_ENV) {
      case 'production':
        return `${name}_production`;
      case 'test':
        return `${name}_test`;
      default:
        return `${name}_development`;
    }  
  }

  return {
    port: Number(process.env.PORT),
    db: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: getName(),
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      dialect: (process.env.DB_DIALECT as Dialect),
    },
    env,
  };
}