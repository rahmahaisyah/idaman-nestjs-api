import { PartialType } from '@nestjs/mapped-types';
import { CreateReferensiTslDto } from './create-referensi-tsl.dto';

export class UpdateReferensiTslDto extends PartialType(CreateReferensiTslDto) {}
