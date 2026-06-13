import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePenangkaranDto } from './dto/create-penangkaran.dto';
import { UpdatePenangkaranDto } from './dto/update-penangkaran.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Penangkaran } from './entities/penangkaran.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PenangkaranService {
  constructor(
    @InjectRepository(Penangkaran)
    private readonly penangkaranRepository: Repository<Penangkaran>,
  ) {}

  async create(createPenangkaranDto: CreatePenangkaranDto, userId: string) {
    const penangkaran = this.penangkaranRepository.create({
      ...createPenangkaranDto,
      userId,
    });
    
    try {
      return await this.penangkaranRepository.save(penangkaran);
    } catch (error) {
      if (error.code === '23503') { 
        throw new BadRequestException(
          'Referensi TSL dengan UUID tersebut tidak terdaftar di database.',
        );
      }
      if (error.code === '23505') { 
        throw new BadRequestException(
          'Nomor Izin (nomorIzin) tersebut sudah terdaftar. Gunakan nomor izin yang unik.',
        );
      }
      throw error;
    }
  }

  findAll() {
    return this.penangkaranRepository.find({
      relations: { user: true, referensiTsl: true },
    });
  }

  findOne(id: string) {
    return this.penangkaranRepository.findOne({
      where: { id },
      relations: { user: true, referensiTsl: true },
    });
  }

  async update(id: string, updatePenangkaranDto: UpdatePenangkaranDto) {
    await this.penangkaranRepository.update(id, updatePenangkaranDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.penangkaranRepository.delete(id);
  }
}
