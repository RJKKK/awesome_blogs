import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {Account} from '../types';
import { ApiProperty } from '@nestjs/swagger';
export class LoginReq implements Account{
  @ApiProperty({description:'用户id',name:'userId'})
  @IsNotEmpty({message:'用户id不能为空'})
  account:string

  @ApiProperty({description:'密码',name:'password'})
  @IsNotEmpty({message:'用户密码不能为空'})
  password:string

}

export class CreateAccountDto implements Account{
  @ApiProperty({description:'用户账号',name:'userId'})
  @IsNotEmpty({message:'用户账号不能为空'})
  account:string


  @ApiProperty({description:'手机号',name:'tel'})
  @Length(11,11,{message:'请输入正确的11位手机号'})
  tel?:number

  @ApiProperty({description:'邮箱',name:'email'})
  @IsEmail(null,{message:"请输入正确的邮箱"})
  email:string

  @ApiProperty({description:'密码',name:'password'})
  @IsNotEmpty({message:'用户密码不能为空'})
  password:string
}