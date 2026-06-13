import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreatePenangkaranDto {
  @IsString()
  @IsNotEmpty()
  namaFasilitas: string;

  @IsOptional()
  @IsString()
  nomorIzin?: string;

  @IsOptional()
  @IsDateString()
  tanggalIzin?: string;

  @IsOptional()
  @IsString()
  fileIzinUrl?: string;

  @IsOptional()
  @IsString()
  penerbitIzin?: string;

  @IsOptional()
  @IsDateString()
  berlakuSampai?: string;

  @IsOptional()
  @IsString()
  namaPimpinan?: string;

  @IsOptional()
  @IsString()
  nomorTelepon?: string;

  @IsOptional()
  @IsString()
  alamatKantor?: string;




  @IsUUID()
  @IsNotEmpty()
  referensiTslId: string;
}
