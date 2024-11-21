import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateEmpleadoDTO {

  @IsNotEmpty()
  @IsString()
  readonly nombre: string

  @IsNotEmpty()
  @IsString()
  readonly apellido_paterno: string

  @IsNotEmpty()
  @IsString()
  readonly apellido_materno: string

  @IsNotEmpty()
  @IsString()
  readonly curp: string

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  readonly telefono: string

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly correo: string
}
