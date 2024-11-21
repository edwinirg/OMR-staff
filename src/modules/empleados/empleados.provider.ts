import { STAFF_REPOSITORY } from "src/core/constants";
import { Empleado } from "./entity/empleado.entity";

export const EmpleadoProvider = [
  {
    provide: STAFF_REPOSITORY,
    useValue: Empleado,
  },
]