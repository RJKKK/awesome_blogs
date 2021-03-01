import { Injectable } from '@nestjs/common';
import { Admins, AdminsDocument } from './admins.schema';
import { Model } from 'mongoose';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdminDto } from '../dtos/createAdminDto';
import { DefaultRes } from '../dtos/commons';
import { errorCode } from '../types/dictionary';
import { DeleteAdmin } from '../dtos/deleteAdmin';
import { EditAdmin } from '../dtos/editAdmin';

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admins.name) private adminsModel: Model<AdminsDocument>) {
  }

  async findOneForLogin(account: string) {
    const res = await this.adminsModel.findOne({ account: account });
    return res;
  }

  async createAdmin(dto: CreateAdminDto) {
    const _email = dto.email.toLowerCase();
    const res = await this.adminsModel.findOneAndUpdate(
      { $or: [{ account: dto.account }, { email: _email }] },
      { $setOnInsert: { ...dto } },
      { upsert: true });
    return (!res) ?
      new DefaultRes(res) :
      new DefaultRes(null, errorCode.ADMIN_EXIST, '账号或邮箱已经被注册！');
  }

  async deleteAdmin(dto: DeleteAdmin) {
    const _email = dto.email.toLowerCase();
    const res = await this.adminsModel.remove(
      {
        $or: [
          { account: dto.account },
          { email: _email },
        ],
      });
    return res ?
      new DefaultRes(null, 0, '删除成功！') :
      new DefaultRes(null, errorCode.ADMIN_NOT_EXIST, '用户不存在！');
  }

  async editAdmin(dto: EditAdmin) {
    const _email = (dto.email && dto.email.toLowerCase()) || '';
    const res = await this.adminsModel.findOneAndUpdate(
      { $or: [{ account: dto.account }, { email: _email }] },
      { $set: { ...dto } });
    return res ?
      new DefaultRes(null, 0, '编辑成功！') :
      new DefaultRes(null, errorCode.ADMIN_NOT_EXIST, '用户不存在！');
  }

  async queryAdmin(dto) {

  }
}
