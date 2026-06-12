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
  facilityName: string;

  @IsOptional()
  @IsString()
  permitNumber?: string;

  @IsOptional()
  @IsDateString()
  permitDate?: string;

  @IsOptional()
  @IsString()
  permitFileUrl?: string;

  @IsOptional()
  @IsString()
  issuer?: string;

  @IsOptional()
  @IsDateString()
  validUntil?: string;

  @IsOptional()
  @IsString()
  directorName?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  officeAddress?: string;

  @IsString()
  @IsNotEmpty()
  facilityAddress: string;



  @IsUUID()
  @IsNotEmpty()
  referensiTslId: string;
}
