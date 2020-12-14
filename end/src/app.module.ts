import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://renjiankun:147258369@cluster0.c7bsj.mongodb.net/AwesomeBlogs?retryWrites=true&w=majority',
      {useCreateIndex:true,useFindAndModify:false}
      ),
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
