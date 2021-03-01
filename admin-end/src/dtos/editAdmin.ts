import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, ValidateIf } from 'class-validator';
import { Admins } from '../admins.interface';

export class EditAdmin implements Admins {

  @ApiProperty({description:'用户账号',name:'account'})
  @ValidateIf(o=>!o.email)
  @IsNotEmpty({message:'请传入账号或邮箱'})
  account:string

  @ApiProperty({description:'邮箱',name:'email'})
  @ValidateIf(o=>!o.account)
  @IsNotEmpty({message:'请传入账号或邮箱'})
  @IsEmail({},{message:"请输入正确的邮箱"})
  email:string

  @ApiProperty({description:'管理员路由权限',name:'auths'})
  auths:number[]

  @ApiProperty({description:'管理员头像',name:'avatar'})
  @IsString()
  avatar:string

  @ApiProperty({description:'管理员昵称',name:'username'})
  @IsString()
  name:string

  @ApiProperty({description:'管理员密码',name:'password'})
  @IsString()
  password:string
}