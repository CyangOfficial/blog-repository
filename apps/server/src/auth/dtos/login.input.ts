import { IsString, IsNotEmpty } from 'class-validator';

export class LoginInputDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly token: string;
}
