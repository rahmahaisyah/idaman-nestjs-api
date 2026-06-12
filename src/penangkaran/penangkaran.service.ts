import { Injectable } from '@nestjs/common';
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

  create(createPenangkaranDto: CreatePenangkaranDto, userId: string) {
    const penangkaran = this.penangkaranRepository.create({
      ...createPenangkaranDto,
      userId,
    });
    return this.penangkaranRepository.save(penangkaran);
  }

  findAll() {
    return this.penangkaranRepository.find({ relations: { user: true } });
  }

  findOne(id: string) {
    return this.penangkaranRepository.findOne({
      where: { id },
      relations: { user: true },
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
