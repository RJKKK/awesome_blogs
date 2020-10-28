import { UnauthorizedException } from '@nestjs/common';
import { statusCode } from '../types/dictionary';
export const processStatusCode = (code:number):never => {
  switch (code) {
    case statusCode.PARAMS_ERROR: throw new UnauthorizedException({msg:"请求参数异常",statusCode:code});
    case statusCode.NOT_ACCOUNT:  throw new UnauthorizedException({msg:"账号不存在",statusCode:code});
    case statusCode.PASSWORD_ERROR:  throw new UnauthorizedException({msg:"密码错误",statusCode:code});
    default: throw new UnauthorizedException({msg:"服务器未知错误",statusCode:500});
  }
}