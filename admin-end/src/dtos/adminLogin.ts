import { Admins, Role } from '../admins.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AdminLogin implements Admins{

  @ApiProperty({description:'用户id',name:'account'})
  @IsNotEmpty({message:'用户id不能为空'})
  account:string

  @ApiProperty({description:'密码',name:'password'})
  @IsNotEmpty({message:'用户密码不能为空'})
  password:string

  auths:number[]
  role:Role
}