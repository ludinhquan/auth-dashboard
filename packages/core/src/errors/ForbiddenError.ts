import { CustomError } from './CustomError';

export class ForbiddenError extends CustomError {
  statusCode = 403;
  message = 'Not authorized';

  constructor(message: string) {
    super(message);
    this.message = message;

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
