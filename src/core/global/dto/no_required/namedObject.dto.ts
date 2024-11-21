import { IsOptional, IsString } from "class-validator";

export class NamedObjectDTO {
  @IsOptional()
  @IsString()
  readonly name?: string;
}