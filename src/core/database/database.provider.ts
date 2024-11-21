import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Client } from 'pg'
import { SEQUELIZE } from 'src/core/constants';
import { Empleado } from 'src/modules/empleados/entity/empleado.entity';

async function createDatabaseIfNotExists(config: SequelizeOptions) {
  const client = new Client({
    user: config.username,
    password: config.password,
    host: config.host,
    port: config.port,
    database: 'postgres',
  });

  try {
    await client.connect();
    await client.query(`CREATE DATABASE ${config.database}`);
    console.info('Database created or already exists.');
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    await client.end();
  }
}

export const databaseProviders = [
  {
    imports: [ConfigModule],
    provide: SEQUELIZE,
    useFactory: async (configService: ConfigService): Promise<Sequelize> => {
      const config = configService.get<SequelizeOptions>('db')
      const env = configService.get<string>('env')
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        /**ENTITY */
        Empleado
      ]);
      try {
        await sequelize.sync({ force: env === 'test' ? true : false });
      } catch (err) {
        if (err.original.code === '3D000') {
          await createDatabaseIfNotExists(config)
          await sequelize.sync({ force: env === 'test' ? true : false });
        } else {
          console.error(err);
        }
      }
      return sequelize;
    },
    inject: [ConfigService]

  },
];