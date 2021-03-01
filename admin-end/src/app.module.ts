import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AdminsModeule } from './admins/admins.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
// import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://rjk222:147258369@cluster0.c7bsj.mongodb.net/AwesomeBlogs?retryWrites=true&w=majority',
      {useCreateIndex:true,useFindAndModify:false}
    ),
    AuthModule,
    // FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
