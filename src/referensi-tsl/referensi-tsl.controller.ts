import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ReferensiTslService } from './referensi-tsl.service';
import { CreateReferensiTslDto } from './dto/create-referensi-tsl.dto';
import { UpdateReferensiTslDto } from './dto/update-referensi-tsl.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('referensi-tsl')
export class ReferensiTslController {
  constructor(private readonly referensiTslService: ReferensiTslService) {}

  @Post()
  create(@Body() createReferensiTslDto: CreateReferensiTslDto) {
    return this.referensiTslService.create(createReferensiTslDto);
  }

  @Get()
  findAll() {
    return this.referensiTslService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.referensiTslService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReferensiTslDto: UpdateReferensiTslDto,
  ) {
    return this.referensiTslService.update(id, updateReferensiTslDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.referensiTslService.remove(id);
  }
}
