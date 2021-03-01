import { ForbiddenException, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { errorCode } from '../types/dictionary';
import routes, { Route } from '../route';
import { Role } from '../admins.interface';

/**
 * @param code
 * 通过传入枚举值，选择出相应的返回错误以及提示信息
 * @author renjiankun
 **/
export const processStatusCode = (code: number): never => {
  switch (code) {
    case errorCode.PARAMS_ERROR:
      throw new ForbiddenException({ msg: '请求参数异常', statusCode: code });
    case errorCode.NOT_ACCOUNT:
      throw new UnauthorizedException({ msg: '账号不存在', statusCode: code });
    case errorCode.PASSWORD_ERROR:
      throw new UnauthorizedException({ msg: '密码错误', statusCode: code });
    case errorCode.NOT_AUTH:
      throw new UnauthorizedException({ msg: '小老弟，你没有权限！', statusCode: code });
    default:
      throw new ServiceUnavailableException({ msg: '服务器未知错误', statusCode: 500 });
  }
};

/**
 * @param authId
 * 通过传入单个id 判断用户是否有权限，有权限返回单条路由，无则返回undefined
 * */
export const judgeAuth = (authId: number): Route | undefined => {
  return routes.find(val => val.id === authId);
};


export const buildAuths = (auths: number[]): Route[] => {
  let result = [] as Route[];
  auths.forEach(val => {
    const _val = judgeAuth(val);
    if (_val) {
      result.push(_val);
    }
  });
  return result;
};


export const allowUse = (user, authId: number): (boolean | never) => {
  if (!user || !user.auths||!user.auths.find(val=>val.id===authId)) {
    processStatusCode(errorCode.NOT_AUTH);
  }
  return true
};

