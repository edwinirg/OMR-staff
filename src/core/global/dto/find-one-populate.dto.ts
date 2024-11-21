
import { IsOptional, IsString } from "class-validator";
import { ParanoidDTO } from "./paranoid.dto";

export class FindOnePopulateDTO extends ParanoidDTO {
  @IsOptional()
  @IsString()
  readonly _id?: string;
  @IsOptional()
  @IsString()
  readonly populate?: string;
  @IsOptional()
  @IsString()
  readonly rows?: string;
}