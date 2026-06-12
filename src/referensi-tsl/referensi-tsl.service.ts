import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReferensiTslDto } from './dto/create-referensi-tsl.dto';
import { UpdateReferensiTslDto } from './dto/update-referensi-tsl.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReferensiTsl } from './entities/referensi-tsl.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReferensiTslService {
  constructor(
    @InjectRepository(ReferensiTsl)
    private readonly referensiTslRepository: Repository<ReferensiTsl>,
  ) {}

  create(createReferensiTslDto: CreateReferensiTslDto) {
    const referensi = this.referensiTslRepository.create(createReferensiTslDto);
    return this.referensiTslRepository.save(referensi);
  }

  findAll() {
    return this.referensiTslRepository.find();
  }

  async findOne(id: string) {
    const referensi = await this.referensiTslRepository.findOne({
      where: { id },
    });
    if (!referensi) {
      throw new NotFoundException(`Referensi TSL with ID ${id} not found`);
    }
    return referensi;
  }

  async update(id: string, updateReferensiTslDto: UpdateReferensiTslDto) {
    await this.referensiTslRepository.update(id, updateReferensiTslDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.referensiTslRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Referensi TSL with ID ${id} not found`);
    }
  }
}
