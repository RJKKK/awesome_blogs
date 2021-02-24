// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Prop,Schema,SchemaFactory } from '@nestjs/mongoose';
import { Admins as AdminsInterface, Role } from '../admins.interface';
import { Document } from "mongoose";

export type AdminsDocument = AdminsInterface & Document

@Schema({})
export class Admins{
  @Prop()
  username:string

  @Prop({required:true,index:{background:true,unique:true}})
  account: string;

  @Prop({required:true})
  email:string;

  @Prop()
  tel?:number;

  @Prop({required:true})
  password:string;

  @Prop()
  avatar:string;

  @Prop()
  auths:number[]

  @Prop()
  createTime?:number

  @Prop()
  updateTime?:number

  @Prop()
  role: Role;
}
export const AdminsSchema = SchemaFactory.createForClass(Admins)