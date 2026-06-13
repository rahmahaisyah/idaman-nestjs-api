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
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PenangkaranService } from './penangkaran.service';
import { AzureStorageService } from '../azure-storage/azure-storage.service';
import { CreatePenangkaranDto } from './dto/create-penangkaran.dto';
import { UpdatePenangkaranDto } from './dto/update-penangkaran.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('penangkaran')
export class PenangkaranController {
  constructor(
    private readonly penangkaranService: PenangkaranService,
    private readonly azureStorageService: AzureStorageService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('fileIzin'))
  async create(
    @Body() createPenangkaranDto: CreatePenangkaranDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
  ) {
    if (file) {
      const url = await this.azureStorageService.uploadFile(file);
      createPenangkaranDto.fileIzinUrl = url;
    }
    return this.penangkaranService.create(createPenangkaranDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.penangkaranService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.penangkaranService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('fileIzin'))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePenangkaranDto: UpdatePenangkaranDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const url = await this.azureStorageService.uploadFile(file);
      updatePenangkaranDto.fileIzinUrl = url;
    }
    return this.penangkaranService.update(id, updatePenangkaranDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.penangkaranService.remove(id);
  }
}
