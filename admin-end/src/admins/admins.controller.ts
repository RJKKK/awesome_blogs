import { CreateAdminDto } from '../dtos/createAdminDto';
import { AdminsService } from './admins.service';
import { DefaultRes } from '../dtos/commons';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Body, Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AdminLogin } from '../dtos/adminLogin';
import {errorCode} from '../types/dictionary';
import { EditAdmin } from '../dtos/editAdmin';

@Controller()
export class AdminsController {
  constructor(private readonly adminsService:AdminsService,private authService: AuthService){}
  @Post('/createAdmin')
  @ApiOperation({description:'新建账号接口'})
  async register(@Body() dto:CreateAdminDto){
    const res = await this.adminsService.createAdmin(dto)
    return res
  }

  @Post('/editAdmin')
  @ApiOperation({description:'修改管理员信息接口'})
  async edit(@Body() dto:EditAdmin){
    const res = await this.adminsService.editAdmin(dto)
    return res
  }


  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  @ApiOperation({description:'登录接口'})
  async login(@Body() body:AdminLogin) {
    const user = await this.adminsService.findOneForLogin(body.account)
    const token =  await this.authService.login(user.account,user.auths,user.role);
    return new DefaultRes(token,0,'登录成功！')

  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @ApiOperation({description:'获取登录信息'})
  getProfile(@Request() req) {
    return req.user;
  }



}
