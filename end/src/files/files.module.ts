import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './multer-config.service';
import { FilesService } from './files.service'

@Module({
  imports: [
    MulterModule.registerAsync({ useClass: GridFsMulterConfigService, }),
  ],
  controllers: [FilesController],
  providers: [FilesService, GridFsMulterConfigService],
  exports:[FilesService,GridFsMulterConfigService]
})
export class FilesModule {}