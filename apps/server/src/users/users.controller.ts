import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '../jwt/jwt.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('getUserInfo')
  async getUserInfo() {
    return [
      {
        userId: '1',
        username: 'vben',
        realName: 'Vben Admin',
        avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
        desc: 'manager',
        password: '123456',
        token: 'fakeToken1',
        homePath: '/dashboard/analysis',
        roles: [
          {
            roleName: 'Super Admin',
            value: 'super',
          },
        ],
      },
      {
        userId: '2',
        username: 'test',
        password: '123456',
        realName: 'test user',
        avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
        desc: 'tester',
        token: 'fakeToken2',
        homePath: '/dashboard/workbench',
        roles: [
          {
            roleName: 'Tester',
            value: 'test',
          },
        ],
      },
    ];
  }

  @Post('register')
  async register(@Body() body) {
    return this.usersService.create(body);
  }

  @Post('login')
  async login(@Body() user: LoginDto) {
    const { username, password } = user;
    const result = await this.usersService.validateUser(username, password);
    return {
      ...result,
      token: await this.jwtService.generateJWT(username, password),
    };
  }

  @Post('update/username')
  async updateUserName(@Request() req) {
    console.log(req);
  }
}
