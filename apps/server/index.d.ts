export {};

declare global {
  namespace Express {
    interface User extends IUser {
      id: string;
      name: string;
      email: string;
      isEmailConfirmed: boolean;
    }
  }
}
