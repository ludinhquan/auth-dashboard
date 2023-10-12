import { CustomError } from './CustomError';

export class ConflictError extends CustomError {
  statusCode = 409;

  constructor(
    message: string,
    private data?: any,
  ) {
    super(message);

    Object.setPrototypeOf(this, ConflictError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, data: this.data }];
  }
}
