import { IsNotEmpty, IsOptional, IsString, IsEnum } from 'class-validator';
import {
  JenisTsl,
  StatusCites,
  StatusIucn,
  StatusPerlindunganNasional,
} from '../entities/referensi-tsl.entity';

export class CreateReferensiTslDto {
  @IsNotEmpty()
  @IsString()
  namaDaerah: string;

  @IsNotEmpty()
  @IsEnum(JenisTsl)
  jenis: JenisTsl;

  @IsNotEmpty()
  @IsString()
  kingdom: string;

  @IsNotEmpty()
  @IsString()
  divisi: string;

  @IsNotEmpty()
  @IsString()
  kelas: string;

  @IsNotEmpty()
  @IsString()
  ordo: string;

  @IsNotEmpty()
  @IsString()
  famili: string;

  @IsNotEmpty()
  @IsString()
  genus: string;

  @IsNotEmpty()
  @IsString()
  spesies: string;

  @IsNotEmpty()
  @IsEnum(StatusPerlindunganNasional)
  statusPerlindunganNasional: StatusPerlindunganNasional;

  @IsNotEmpty()
  @IsEnum(StatusCites)
  statusCites: StatusCites;

  @IsNotEmpty()
  @IsEnum(StatusIucn)
  statusIucn: StatusIucn;
}
