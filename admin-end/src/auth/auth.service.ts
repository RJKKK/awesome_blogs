import { Injectable } from '@nestjs/common';
import { AdminsService } from '../admins/admins.service';
import { JwtService } from '@nestjs/jwt';
import { errorCode } from '../types/dictionary';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService:AdminsService,
    private jwtService: JwtService){}

  async validateUser(account,pass):Promise<errorCode|any>{
    const user:any = await this.accountsService.findOneForLogin(account);
    if(!user){
      return errorCode.NOT_ACCOUNT
    }
    if(user.password===pass){
      return {account:user.account,password:pass}
  }
    else return errorCode.PASSWORD_ERROR
}
  async login(account: string) {
    const payload = { account };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
