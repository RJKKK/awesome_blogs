import { Injectable,  HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose'
// @ts-ignore
import { MongoGridFS } from 'mongo-gridfs'
import { Connection, Mongoose } from 'mongoose'
import { GridFSBucketReadStream } from 'mongodb'
import { FileInfo } from './interfaces/fileinfo.interface';

@Injectable()
export class FilesService {
  private readonly fileModel: MongoGridFS;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.fileModel = new MongoGridFS(this.connection.db, 'fs');
  }



  async readStream(id: string): Promise<GridFSBucketReadStream> {
    return await this.fileModel.readFileStream(id);
  }

  async findInfo(id: string): Promise<FileInfo> {

    console.log(id);

    const result = await this.fileModel
      .findById('5e9cdb49194ba358bd9a7da5').catch( err => {throw new HttpException('File not found', HttpStatus.NOT_FOUND)} )
      .then(result => result)
    return {
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: result.md5,
      contentType: result.contentType
    }
  }

  async deleteFile(id: string): Promise<boolean>{
    return await this.fileModel.delete(id)
  }
}
