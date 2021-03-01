import { Injectable } from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';
import { JwtService } from '@nestjs/jwt';
import { errorCode } from '../types/dictionary';
import { Role } from '../admins.interface';
import { processStatusCode } from '../helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService:AdminsService,
    private jwtService: JwtService){}

  async validateUser(account,pass):Promise<errorCode|any>{
    const user:any = await this.accountsService.findOneForLogin(account);
    if(!user){
      processStatusCode(errorCode.NOT_ACCOUNT)
    }
    if(user.password===pass){
      return {account:user.account,password:pass,auths:user.auths}
  }
    else processStatusCode(errorCode.PASSWORD_ERROR)
}
  async login(account: string,auths:number[],role:Role) {
    const payload = { account,auths,role};
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
