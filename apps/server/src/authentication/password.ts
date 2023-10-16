import { validatePassword } from '@lib/core';
import * as bcrypt from 'bcrypt';

export class Password {
  static readonly SALT_OR_ROUND = 10;

  static validate(password: string) {
    return validatePassword(password);
  }

  static async hash(password: string, salt: number = Password.SALT_OR_ROUND) {
    return bcrypt.hash(password, salt);
  }

  static async compare(plainTextPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
