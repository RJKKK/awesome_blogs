import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AccountsModule } from '../accounts/accounts.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[AccountsModule,PassportModule,JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1800s' },
  })],
  providers:[AuthService,LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
