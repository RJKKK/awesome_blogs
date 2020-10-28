import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
  use( req: any, res: any, next: () => void): any {
    // console.log(`${req.toString()}----${res.toString()}`)
    next()
  }
}