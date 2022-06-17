import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { RegistertDTO } from './dtos/register.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.userModel.find(user => user.username === username);
  // }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findById({ _id: id });
  }

  async findOneByUserName(username: string) {
    return this.userModel.findOne({ username });
  }

  async create(input: RegistertDTO): Promise<User> {
    // console.log(input)
    return this.userModel.create(input);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findOneByUserName(username);
    if (user && user.comparePassword(password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    throw new HttpException('账号或密码错误', HttpStatus.BAD_REQUEST);
  }

  // async verifyToken(token: string) {
  //   const verify = await this.jwtService.verify(token)
  //   console.log(verify)
  //   return verify
  // }

  // async updateUserName(username: string, req: Request) {
  //   console.log(req)

  //   const res = await this.jwtService.verify
  // }
}
