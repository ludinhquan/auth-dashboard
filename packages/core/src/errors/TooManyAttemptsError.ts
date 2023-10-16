import { CustomError } from './CustomError';

export class TooManyAttemptsError extends CustomError {
  statusCode = 429;

  constructor(
    public readonly message: string,
    public readonly data?: any,
  ) {
    super(message ?? 'Too Many Requests');

    Object.setPrototypeOf(this, TooManyAttemptsError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, data: this.data }];
  }
}
