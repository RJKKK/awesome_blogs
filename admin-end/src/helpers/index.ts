import { ForbiddenException,UnauthorizedException,ServiceUnavailableException } from '@nestjs/common';
import {  errorCode } from '../types/dictionary';
/**
 * @param code
 * 通过传入枚举值，选择出相应的返回错误以及提示信息
 * @author renjiankun
 **/
export const processStatusCode = (code:number):never => {
  switch (code) {
    case errorCode.PARAMS_ERROR: throw new ForbiddenException({msg:"请求参数异常",statusCode:code});
    case errorCode.NOT_ACCOUNT:  throw new UnauthorizedException({msg:"账号不存在",statusCode:code});
    case errorCode.PASSWORD_ERROR:  throw new UnauthorizedException({msg:"密码错误",statusCode:code});
    default: throw new ServiceUnavailableException({msg:"服务器未知错误",statusCode:500});
  }
}