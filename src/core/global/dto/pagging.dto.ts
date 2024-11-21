import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ParanoidDTO } from './paranoid.dto';

export class PaggingDTO extends ParanoidDTO {
  @IsOptional()
  @IsNumber()
  readonly page?: number;
  @IsNumber()
  @IsOptional()
  readonly records?: number;
  @IsOptional()
  @IsString()
  readonly search?: string;
  @IsOptional()
  @IsString()
  readonly order?: string;
  @IsOptional()
  @IsString()
  readonly rows?: string;
  @IsOptional()
  @IsString()
  @IsUUID()
  readonly _id?: string;
  @IsOptional()
  @IsString()
  readonly populate?: string;
}
