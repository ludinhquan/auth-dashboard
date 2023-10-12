import * as bcrypt from 'bcrypt';

export class Password {
  static readonly SALT_OR_ROUND = 10;

  static validate(password: string) {
    return (
      !/^(?=.*[a-z])/.test(password) || // Contains at least one lowercase character
      !/^(?=.*[A-Z])/.test(password) || // Contains at least one uppercase character
      !/^(?=.*\d)/.test(password) || // Contains at least one digit character
      !/^(?=.*[!@#$%^&*()_+|~\-=`{}[\]:";'<>?,./])/.test(password) || // Contains at least one special character (modify the character set within square brackets as needed)
      !/^.{8,}$/.test(password) // Contains at least 8 characters
    );
  }

  static async hash(password: string, salt: number = Password.SALT_OR_ROUND) {
    return bcrypt.hash(password, salt);
  }

  static async compare(plainTextPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
