import { IsBoolean, IsOptional } from "class-validator";

export class ParanoidDTO {
  @IsOptional()
  @IsBoolean()
  readonly paranoid?: boolean;
  @IsOptional()
  @IsBoolean()
  readonly deletedAt?: boolean;
}