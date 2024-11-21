import { Module } from '@nestjs/common';
import { EmpleadoService } from './empleados.service';
import { EmpleadoController } from './empleados.controller';
import { EmpleadoProvider } from './empleados.provider';

@Module({
  controllers: [EmpleadoController],
  providers: [EmpleadoService, ...EmpleadoProvider],
})
export class EmpleadosModule {}
