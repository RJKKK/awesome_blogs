import { forwardRef, Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { Admins, AdminsSchema } from './admins.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: Admins.name, schema: AdminsSchema,collection:'Admins'}]),
    forwardRef(()=>AuthModule)
  ],
  providers: [AdminsService],
  controllers: [AdminsController],
  exports:[AdminsService]
})
export class AdminsModule {}
