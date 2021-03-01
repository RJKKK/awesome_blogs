import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, isLowercase, IsNotEmpty, ValidateIf } from 'class-validator';
import { Admins } from '../admins.interface';

export class DeleteAdmin implements Admins {

  @ApiProperty({description:'用户账号',name:'account'})
  @ValidateIf(o=>!o.email)
  @IsNotEmpty({message:'请传入账号或邮箱'})
  account:string

  @ApiProperty({description:'邮箱',name:'email'})
  @ValidateIf(o=>!o.account)
  @IsNotEmpty({message:'请传入账号或邮箱'})
  @IsEmail({},{message:"请输入正确的邮箱"})
  email:string

}