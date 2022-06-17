import { Document } from 'mongoose';
export interface User extends Document {
  readonly username: string;
  readonly email: string;
  password: string;
  readonly name?: string;
  comparePassword(password: string): boolean;
}
