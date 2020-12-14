
import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
// @ts-ignore
import * as GridFsStorage from 'multer-gridfs-storage';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: GridFsStorage;
  constructor() {
    this.gridFsStorage = new GridFsStorage({
      url: 'mongodb+srv://renjiankun:147258369@cluster0.c7bsj.mongodb.net/Files?retryWrites=true&w=majority',
      file: (req, file) => {
        return new Promise((resolve, reject) => {
          const filename = file.originalname.trim();
          const fileInfo = {
            filename: filename
          };
          resolve(fileInfo);
        });
      }
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}