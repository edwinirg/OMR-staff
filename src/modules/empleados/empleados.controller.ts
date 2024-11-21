import { EmpleadoService } from './empleados.service';
import { CreateEmpleadoDTO } from './dto/create.dto';
import { UpdateEmpleadoDTO } from './dto/update.dto';
import { BaseController } from 'src/core/global/controller/base.controller';
import { FindEmpleadoDTO } from './dto/find.dto';
import { Empleado } from './entity/empleado.entity';

const EmpleadoController = BaseController<CreateEmpleadoDTO, FindEmpleadoDTO, UpdateEmpleadoDTO, Empleado>(EmpleadoService, 'CarpetasJuicios');
export { EmpleadoController }
