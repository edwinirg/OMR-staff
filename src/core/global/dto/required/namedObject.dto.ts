import { IsNotEmpty, IsString } from "class-validator";

export class NamedObjectDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}