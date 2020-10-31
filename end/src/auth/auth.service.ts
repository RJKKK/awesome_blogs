import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { JwtService } from '@nestjs/jwt';
import { statusCode } from '../types/dictionary';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService:AccountsService,
    private jwtService: JwtService){}

  async validateUser(account,pass):Promise<statusCode|any>{
    const user:any = await this.accountsService.findOneForLogin(account);
    if(!user){
      return statusCode.NOT_ACCOUNT
    }
    if(user.password===pass){
      return {account:user.account,password:pass}
  }
    else return statusCode.PARAMS_ERROR
}
  async login(account: string) {
    const payload = { account };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
