import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { PaggingDTO } from "src/core/global/dto/pagging.dto";

export class FindEmpleadoDTO extends PaggingDTO{
  @IsOptional()
  @IsString()
  readonly nombre?: string

  @IsOptional()
  @IsString()
  readonly apellido_paterno?: string

  @IsOptional()
  @IsString()
  readonly apellido_materno?: string

  @IsOptional()
  @IsString()
  readonly curp?: string

  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  readonly telefono?: string

  @IsOptional()
  @IsString()
  @IsEmail()
  readonly correo?: string
}