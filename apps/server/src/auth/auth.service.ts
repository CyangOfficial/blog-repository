import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { UsersService } from '../users/users.service';
import { LoginInputDto } from './dtos/login.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('账号或密码错误');
  }

  async login(user: LoginInputDto) {
    const { username, password } = user;
    const result = await this.validateUser(username, password);
    return {
      ...result,
      access_token: await this.jwtService.generateJWT(username, password),
    };
  }
}
