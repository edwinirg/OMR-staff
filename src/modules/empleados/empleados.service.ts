import { Inject, Injectable } from '@nestjs/common';
import { STAFF_REPOSITORY } from 'src/core/constants';
import { BaseService } from 'src/core/global/services/global.service';
import { Empleado } from './entity/empleado.entity';
import { CreateEmpleadoDTO } from './dto/create.dto';
import { FindEmpleadoDTO } from './dto/find.dto';
import { UpdateEmpleadoDTO } from './dto/update.dto';


@Injectable()
export class EmpleadoService extends BaseService<Empleado, CreateEmpleadoDTO, FindEmpleadoDTO, UpdateEmpleadoDTO> {
  constructor(
    @Inject(STAFF_REPOSITORY)
    private readonly EmpleadoRepository: typeof Empleado,
  ) {
    super(EmpleadoRepository, 'Empleado')
  }
}
