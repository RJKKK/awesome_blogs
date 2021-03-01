// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Prop,Schema,SchemaFactory } from '@nestjs/mongoose';
import { Admins as AdminsInterface, Role } from '../admins.interface';
import { Document } from "mongoose";

export type AdminsDocument = AdminsInterface & Document


@Schema({timestamps:{createdAt:'created',updatedAt:'updated',currentTime:()=>(Date.now()/1000+8*60*60)*1000}})
export class Admins{
  @Prop()
  username:string

  @Prop({required:true,index:{background:true,unique:true}})
  account: string;

  @Prop({required:true})
  email:string;

  @Prop()
  tel?:number;

  @Prop({required:true},)
  password:string;

  @Prop()
  avatar:string;

  @Prop({default:[2,3,4]})
  auths:number[]


  @Prop({default:0})
  role: Role;
}
export const AdminsSchema = SchemaFactory.createForClass(Admins)
