import { Module } from '@nestjs/common';
import { PenangkaranService } from './penangkaran.service';
import { PenangkaranController } from './penangkaran.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Penangkaran } from './entities/penangkaran.entity';
import { AzureStorageModule } from '../azure-storage/azure-storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([Penangkaran]), AzureStorageModule],
  controllers: [PenangkaranController],
  providers: [PenangkaranService],
})
export class PenangkaranModule {}
