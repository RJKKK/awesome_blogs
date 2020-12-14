// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Prop,Schema,SchemaFactory } from '@nestjs/mongoose';
import {Account as AccountInterface} from '../types';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document

@Schema({})
export class Account implements AccountInterface{
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

}

export const AccountSchema = SchemaFactory.createForClass(Account)