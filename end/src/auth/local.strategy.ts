import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { processStatusCode } from '../helpers';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private  authService: AuthService) {
    super({usernameField:'account'});

  }

  async validate(account:string,password:string): Promise<any> {
    const res = await this.authService.validateUser(account, password);
    if(typeof res === "number")
      processStatusCode(res)
    else return res;
  }
}
