import { Module } from '@nestjs/common';
import { PenangkaranService } from './penangkaran.service';
import { PenangkaranController } from './penangkaran.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Penangkaran } from './entities/penangkaran.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Penangkaran])],
  controllers: [PenangkaranController],
  providers: [PenangkaranService],
})
export class PenangkaranModule {}
