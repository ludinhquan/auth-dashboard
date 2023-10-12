import * as bcrypt from 'bcrypt';

export class Password {
  static readonly SALT_OR_ROUND = 10;

  static async hash(password: string, salt: number = Password.SALT_OR_ROUND) {
    return bcrypt.hash(password, salt);
  }

  static async compare(plainTextPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
