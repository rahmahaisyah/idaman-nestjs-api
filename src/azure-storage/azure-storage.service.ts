import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { extname } from 'path';

@Injectable()
export class AzureStorageService {
  private readonly logger = new Logger(AzureStorageService.name);
  private containerClient;

  constructor(private readonly configService: ConfigService) {
    const connectionString = this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');
    const containerName = this.configService.get<string>('AZURE_STORAGE_CONTAINER_NAME');

    if (!connectionString || !containerName) {
      this.logger.warn('Azure Storage configuration is missing from .env');
      return;
    }

    try {
      const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      this.containerClient = blobServiceClient.getContainerClient(containerName);
      this.logger.log(`Azure Blob Storage connected: Container [${containerName}]`);
    } catch (error) {
      this.logger.error('Failed to initialize Azure Blob Storage', error);
    }
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'filesk'): Promise<string> {
    if (!this.containerClient) {
      throw new InternalServerErrorException('Azure Storage is not configured properly.');
    }

    try {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = extname(file.originalname);
      const blobName = `${folder}/${uniqueSuffix}${extension}`;

      const blockBlobClient: BlockBlobClient = this.containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.uploadData(file.buffer, {
        blobHTTPHeaders: { blobContentType: file.mimetype },
      });

      this.logger.log(`File successfully uploaded to Azure: ${blockBlobClient.url}`);
      return blockBlobClient.url;
    } catch (error) {
      this.logger.error('Error uploading file to Azure', error);
      throw new InternalServerErrorException('Failed to upload file to Azure Cloud.');
    }
  }
}
