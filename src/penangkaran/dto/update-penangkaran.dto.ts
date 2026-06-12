import { PartialType } from '@nestjs/mapped-types';
import { CreatePenangkaranDto } from './create-penangkaran.dto';

export class UpdatePenangkaranDto extends PartialType(CreatePenangkaranDto) {}
