import { Controller, Post, UseGuards, Request, Body, UseInterceptors, UploadedFiles, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateAccountDto, LoginReq } from '../Dtos/request';
import { AccountsService } from './accounts.service';
import { DefaultRes } from '../Dtos/response';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller()
export class AccountsController {
  constructor(private readonly accountService:AccountsService,private authService: AuthService){}
  @Post('/createAccount')
  @ApiOperation({description:'新建账号接口'})
  async register(@Body() createAccountDto:CreateAccountDto){
   const res = await this.accountService.createAccount(createAccountDto)
    return new DefaultRes<any>(res)
  }

  @Post('/uploadFiles')
  @UseInterceptors(FilesInterceptor('files',null,{preservePath:true}))
  async uploadFiles(@UploadedFiles() files,@Body() body ){
    return new DefaultRes(null,null,'上传成功')
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  @ApiOperation({description:'登录接口'})
  async login(@Body() body:LoginReq) {
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
