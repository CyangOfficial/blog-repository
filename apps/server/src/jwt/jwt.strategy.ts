import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 忽略过期验证
      ignoreExpiration: false,
      secretOrKey: config.get('jwtSecretKey'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.userId, username: payload.username };
  }
}
