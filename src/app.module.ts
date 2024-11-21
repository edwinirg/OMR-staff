import { Module } from '@nestjs/common';
import { validationSchema } from './core/config/schemas/config.schema';
import { ConfigModule } from '@nestjs/config';
import { config } from './core/config';
import { EmpleadosModule } from './modules/empleados/empleados.module';
import { DatabaseModule } from './core/database/database.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
      envFilePath: '.env.development',
      load: [config],
    }),
    /**Only Staff */
    DatabaseModule,
    EmpleadosModule
  ],
  
})
export class AppModule {}
