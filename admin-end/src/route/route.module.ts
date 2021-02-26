import { Module } from '@nestjs/common';
import { RouteService } from './route.service';

@Module({
  providers: [RouteService]
})
export class RouteModule {}
