import { Injectable } from '@nestjs/common';
import { Account,AccountDocument } from '../schemas/account.schema';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { InjectModel } from '@nestjs/mongoose';
import { SetLoginToken } from '../Dtos/response';
import { CreateAccountDto } from '../Dtos/request';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) {
  }

  async findOneForLogin(account: string) {
    const res = await this.accountModel.findOne({ account: account })
    return res
  }

  async createAccount(dto: CreateAccountDto) {
    const res = await this.accountModel.findOneAndUpdate(
      { $or: [{ account: dto.account }, { email: dto.email }] },
      { $setOnInsert: dto },
      { upsert: true })
    return res
  }


}
