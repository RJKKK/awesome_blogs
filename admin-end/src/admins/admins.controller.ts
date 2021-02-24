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

@Controller()
export class AdminsController {
  constructor(private readonly adminsService:AdminsService,private authService: AuthService){}
  @Post('/createAccount')
  @ApiOperation({description:'新建账号接口'})
  async register(@Body() createAdminDto:CreateAdminDto){
    const res = await this.adminsService.createAdmin(createAdminDto)
    return (!res)? new DefaultRes(res):new DefaultRes(null,errorCode.ADMIN_EXIST,'账号或邮箱已经被注册！')
  }


  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  @ApiOperation({description:'登录接口'})
  async login(@Body() body:AdminLogin) {
    const token =  await this.authService.login(body.account);
    return new DefaultRes(token,0,'登录成功！')

  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @ApiOperation({description:'获取登录信息'})
  getProfile(@Request() req) {
    return req.user;
  }
}
