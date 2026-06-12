import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePenangkaranDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  species: string;
}
