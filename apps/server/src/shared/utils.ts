import * as bcrypt from 'bcrypt';
// import { JwtVerifyOptions } from '@nestjs/jwt'
export const encrypt = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const decodeJWT = () => {};
