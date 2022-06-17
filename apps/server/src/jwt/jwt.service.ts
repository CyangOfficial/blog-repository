import { Injectable } from '@nestjs/common';
import { JwtService as JWTService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: JWTService) {}

  // 生成JWT token
  async generateJWT(username: string, password: string) {
    const payload = { username, password };
    return this.jwtService.sign(payload);
  }

  // token 验证
  async verifyToken(token: string) {
    const verify = await this.jwtService.verify(token);
    console.log(verify);
    return verify;
  }
}
