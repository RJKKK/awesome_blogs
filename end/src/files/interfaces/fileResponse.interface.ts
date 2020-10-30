
import { FileInfo } from './fileinfo.interface'

export interface FileResponse {
  readonly file: FileInfo;
  readonly message: string;
}