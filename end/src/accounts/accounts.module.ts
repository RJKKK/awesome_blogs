import { forwardRef, Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from '../schemas/account.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema,collection:'Accounts'}]),
    forwardRef(()=>AuthModule)
  ],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports:[AccountsService]
})
export class AccountsModule {}
