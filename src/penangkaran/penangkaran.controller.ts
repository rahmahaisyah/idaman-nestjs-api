import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PenangkaranService } from './penangkaran.service';
import { CreatePenangkaranDto } from './dto/create-penangkaran.dto';
import { UpdatePenangkaranDto } from './dto/update-penangkaran.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('penangkaran')
export class PenangkaranController {
  constructor(private readonly penangkaranService: PenangkaranService) {}

  @Post()
  create(
    @Body() createPenangkaranDto: CreatePenangkaranDto,
    @Request() req: any,
  ) {
    return this.penangkaranService.create(createPenangkaranDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.penangkaranService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.penangkaranService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePenangkaranDto: UpdatePenangkaranDto,
  ) {
    return this.penangkaranService.update(id, updatePenangkaranDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.penangkaranService.remove(id);
  }
}
