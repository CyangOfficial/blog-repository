import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';
export class RegistertDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  @IsEmail()
  @IsNotEmpty({ message: '邮箱不能为空' })
  readonly email: string;
}
