export interface FileInfo {
  readonly length: number;
  readonly chunkSize: number;
  readonly filename: string;
  readonly md5: string;
  readonly contentType: string;
}