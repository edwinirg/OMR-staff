import { IsNotEmpty, ValidateNested, IsString, IsUUID } from "class-validator"
import { CreateEmpleadoDTO } from "./create.dto"
import { Type } from "class-transformer"

export class UpdateEmpleadoDTO { 
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateEmpleadoDTO)
  readonly data: CreateEmpleadoDTO

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  readonly _id: string
  
}
