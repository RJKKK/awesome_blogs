import { Admins, Role } from '../admins.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAdminDto implements Admins{

  @ApiProperty({description:'用户账号',name:'account'})
  @IsNotEmpty({message:'用户账号不能为空'})
  account:string

  @ApiProperty({description:'邮箱',name:'email'})
  @IsEmail({},{message:"请输入正确的邮箱"})
  email:string

  @ApiProperty({description:'密码',name:'password'})
  @IsNotEmpty({message:'用户密码不能为空'})
  password:string
}