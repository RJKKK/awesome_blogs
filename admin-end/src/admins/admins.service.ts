import { Injectable } from '@nestjs/common';
import { Admins,AdminsDocument } from './admins.schema';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdminDto } from '../dtos/createAdminDto';

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admins.name) private adminsModel: Model<AdminsDocument>) {
  }
  async findOneForLogin(account: string) {
    const res = await this.adminsModel.findOne({ account: account })
    return res
  }
  async createAdmin(dto: CreateAdminDto) {
    const _email = dto.email.toLowerCase()
    const res = await this.adminsModel.findOneAndUpdate(
      { $or: [{ account: dto.account }, { email: _email }] },
      { $setOnInsert: dto },
      { upsert: true })
    return res
  }
}
