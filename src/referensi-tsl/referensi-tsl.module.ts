import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferensiTslService } from './referensi-tsl.service';
import { ReferensiTslController } from './referensi-tsl.controller';
import { ReferensiTsl } from './entities/referensi-tsl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReferensiTsl])],
  providers: [ReferensiTslService],
  controllers: [ReferensiTslController],
  exports: [ReferensiTslService],
})
export class ReferensiTslModule {}
